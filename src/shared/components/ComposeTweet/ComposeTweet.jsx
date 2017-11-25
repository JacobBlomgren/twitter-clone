import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import stringLength from 'string-length';

import '../../../client/styles/compose.scss';

const hashtagPlugin = createHashtagPlugin({
  theme: { hashtag: 'Compose__Hashtag' },
});

const plugins = [hashtagPlugin];

export default class ComposeTweet extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty(), value: '' };
    this.onChange = editorState => this.setState({ editorState });
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
  }
  render() {
    const { editorState } = this.state;
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

// ComposeTweet.propTypes = {};