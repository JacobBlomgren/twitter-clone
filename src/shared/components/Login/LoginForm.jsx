import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import LoginError from './LoginError';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      dissmissed: [],
    };

    this.onCloseError = this.onCloseError.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.login = this.props.login;
  }

  onCloseError(errorID) {
    this.setState(prevState => ({
      dissmissed: [...prevState.dissmissed, errorID],
    }));
  }

  onChangeUsername(e) {
    this.setState({ username: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.login(this.state.username, this.state.password);
  }

  render() {
    const { error, from, loggedIn } = this.props;
    if (loggedIn) return <Redirect to={from || '/'} />;

    const { username, password, dissmissed } = this.state;

    const showError = error && !dissmissed.includes(error.id);
    const valid = /^[a-z0-9]{3,15}$/i.test(username) && password.length >= 8;
    return (
      <div className="Login__Form">
        {showError && (
          <LoginError
            error={error.message}
            show={showError}
            onClose={() => this.onCloseError(error.id)}
          />
        )}
        <form className="clearfix" onSubmit={this.onSubmit}>
          <label htmlFor="username" className="Login__Input__Label">
            <span className="sr-only">Username</span>
            <input
              type="text"
              value={username}
              onChange={this.onChangeUsername}
              className="Login__Input"
              placeholder="Username"
              autoComplete="on"
              id="username"
            />
          </label>
          <label htmlFor="password" className="Login__Input__Label">
            <span className="sr-only">Password</span>
            <input
              type="password"
              value={password}
              onChange={this.onChangePassword}
              className="Login__Input"
              placeholder="Password"
              autoComplete="current-password"
              id="password"
            />
          </label>
          <input
            type="submit"
            value="Post"
            className="btn btn-primary Login__Button"
            disabled={!valid}
            aria-disabled={!valid}
          />
        </form>
      </div>
    );
  }
}

LoginForm.defaultProps = {
  error: null,
  from: null,
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
    id: PropTypes.number,
  }),
  from: PropTypes.string,
};
