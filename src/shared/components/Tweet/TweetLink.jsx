import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

/**
 * A link to a Tweet. HTML doesn't allow a link within a link, which is necessary in this case
 */
export default class TweetLink extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ redirect: true });
  }

  render() {
    if (this.state.redirect)
      return <Redirect push to={`/t/${this.props.id}`} />;
    return (
      <div onClick={this.handleClick} role="button">
        {this.props.children}
      </div>
    );
  }
}

TweetLink.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};
