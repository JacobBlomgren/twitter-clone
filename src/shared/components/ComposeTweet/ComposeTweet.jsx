import React, { Component } from 'react';
import * as R from 'ramda';
import Fuse from 'fuse.js';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createMentionPlugin from 'draft-js-mention-plugin';
import stringLength from 'string-length';

import '../../../client/styles/compose.scss';

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

  handleSubmit(e) {
    e.preventDefault();
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

  render() {
    const { MentionSuggestions } = mentionPlugin;
    const { editorState, suggestions } = this.state;
    const value = editorState.getCurrentContent().getPlainText();
    return (
      <main>
        <form
          className="MainColumn ComposeTweet SmallPadding"
          onSubmit={this.handleSubmit}
        >
          <Editor
            editorState={editorState}
            onChange={this.onChange}
            plugins={plugins}
            placeholder="What's on your mind?"
          />
          <MentionSuggestions
            onSearchChange={this.onSearchChange}
            suggestions={suggestions}
          />
          <div className="ComposeTweet__Bottom">
            <span className="float-right">
              <span className="ComposeTweet__Count LightText">
                {140 - stringLength(value)}
              </span>
              <input
                type="submit"
                value="Post"
                className="btn btn-primary ComposeTweet__Submit"
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
};
