import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import stringLength from 'string-length';

export default class ComposeTweet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <main>
        <form
          className="MainColumn ComposeTweet SmallPadding"
          onSubmit={this.handleSubmit}
        >
          <textarea
            value={this.state.value}
            placeholder="What's on your mind?"
            onChange={this.handleChange}
            className="ComposeTweet__Textarea"
            rows={6}
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
