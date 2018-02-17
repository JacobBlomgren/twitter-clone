import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../Spinners/Spinner';

export default class Logout extends Component {
  componentDidMount() {
    this.props.logout(() => this.props.history.replace('/'));
  }

  render() {
    return (
      <main>
        <Spinner fullPage />
      </main>
    );
  }
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func,
  }).isRequired,
};
