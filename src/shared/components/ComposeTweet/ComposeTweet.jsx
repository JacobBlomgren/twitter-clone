import React, { Component } from 'react';
import * as R from 'ramda';
import Fuse from 'fuse.js';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createMentionPlugin from 'draft-js-mention-plugin';
import stringLength from 'string-length';

import SmallSpinner from '../Spinners/SmallSpinner';

const hashtagPlugin = createHashtagPlugin({
  theme: { hashtag: 'Compose__Hashtag' },
});

const createFuse = users =>
  new Fuse(users, {
    shouldSort: true,
    keys: ['name'],
  });

const mentionPlugin = createMentionPlugin({
  entityMutabilityCan: 'MUTABLE',
});

const plugins = [hashtagPlugin, mentionPlugin];

export default class ComposeTweet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      suggestions: props.users,
    };
    this.fuse = createFuse(props.users);

    this.onChange = editorState => this.setState({ editorState });
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!R.equals(this.props.users, nextProps.users)) {
      this.fuse = createFuse(nextProps.users);
    }
  }

  onSearchChange({ value }) {
    const suggestions = this.fuse.search(value);
    const contains = R.contains(value, suggestions);
    // We add the currently typed value to the suggestion list to avoid the
    // unfortunate feature of the mention plugin where, if the enter button is
    // pressed when the suggestion list is empty (for instance if it's loading
    // autocompletion in the background), no mention will be added visibly, i.e.
    // with red color.
    const withValue = [
      { name: `@${value}`, avatar: '/static/avatars/1.png' },
      ...suggestions,
    ];
    this.setState(() => ({
      suggestions: contains || value === '' ? suggestions : withValue,
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
      <main className="Main--FullPage">
        <form
          className="MainColumn ComposeTweet SmallPadding"
          onSubmit={posting ? e => e.preventDefault() : this.handleSubmit}
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
