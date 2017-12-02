import React, { Component } from 'react';
import * as R from 'ramda';
import Fuse from 'fuse.js';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createMentionPlugin from 'draft-js-mention-plugin';
import stringLength from 'string-length';

import SmallSpinner from '../SmallSpinner';

const hashtagPlugin = createHashtagPlugin({
  theme: { hashtag: 'Compose__Hashtag' },
});

const fuseOptions = {
  shouldSort: true,
  keys: ['name'],
};

const mentionPlugin = createMentionPlugin({
  entityMutabilityCan: 'MUTABLE',
});

const plugins = [hashtagPlugin, mentionPlugin];

export default class ComposeTweet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      users: props.users,
      fuse: new Fuse(props.users, fuseOptions),
      suggestions: props.users,
    };

    this.onChange = editorState => this.setState({ editorState });
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!R.equals(this.props.users, nextProps.users)) {
      this.setState({
        users: nextProps.users,
        fuse: new Fuse(nextProps.users, fuseOptions),
      });
    }
  }

  onSearchChange({ value }) {
    this.setState(prevState => ({
      suggestions: prevState.fuse.search(value),
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.postTweet(
      this.state.editorState.getCurrentContent().getPlainText(),
      null,
      id => this.props.history.replace(`/t/${id}`),
    );
  }

  render() {
    const { MentionSuggestions } = mentionPlugin;
    const { editorState, suggestions } = this.state;
    const { posting } = this.props;
    const value = editorState.getCurrentContent().getPlainText();
    const disabled = value === '' || stringLength(value) >= 140;
    // can't change it once it's posted.
    const onChange = posting ? () => null : this.onChange;
    return (
      <main>
        <form
          className="MainColumn ComposeTweet SmallPadding"
          onSubmit={this.handleSubmit}
        >
          <Editor
            editorState={editorState}
            onChange={onChange}
            plugins={plugins}
            placeholder="What's on your mind?"
          />
          <MentionSuggestions
            onSearchChange={this.onSearchChange}
            suggestions={suggestions}
          />
          <div className="ComposeTweet__Bottom">
            <span className="float-right">
              {posting && <SmallSpinner className="ComposeTweet__Spinner" />}
              <span className="ComposeTweet__Count LightText">
                {140 - stringLength(value)}
              </span>
              <input
                type="submit"
                value="Post"
                className="btn btn-primary ComposeTweet__Submit"
                disabled={disabled}
                aria-disabled={disabled}
              />
            </span>
          </div>
        </form>
      </main>
    );
  }
}

ComposeTweet.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
  ).isRequired,
  posting: PropTypes.bool.isRequired,
  postTweet: PropTypes.func.isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func,
  }).isRequired,
};
