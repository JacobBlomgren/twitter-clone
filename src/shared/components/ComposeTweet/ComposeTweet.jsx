import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Editor, EditorState } from 'draft-js';
import stringLength from 'string-length';

// import 'draft-js/dist/Draft.css';

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
    console.log(this.state.editorState.getCurrentContent());
    console.log('asdasdasd');
    return (
      <main>
        <form
          className="MainColumn ComposeTweet SmallPadding"
          onSubmit={this.handleSubmit}
        >
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
          <div className="ComposeTweet__Bottom">
            <span className="float-right">
              <span className="ComposeTweet__Count LightText">
                {140 - stringLength(this.state.value)}
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
