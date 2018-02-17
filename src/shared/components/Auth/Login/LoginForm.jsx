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
      // We keep track of the dismissed error alerts so that we know if the currently displayed error
      // has been dismissed. This is useful if the user fails to log in twice in a row.
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
    if (!this.props.submitted)
      this.props.login(this.state.username, this.state.password);
  }

  render() {
    const { error, from, loggedIn } = this.props;
    // from is a URL to return to after succesful login.
    if (loggedIn) return <Redirect to={from || '/'} />;

    const { username, password, dissmissed } = this.state;

    const showError = error && !dissmissed.includes(error.id);
    const valid = /^[a-z0-9]{3,15}$/i.test(username) && password.length >= 8;
    return (
      <div className="Form">
        {showError && (
          <LoginError
            error={error.message}
            show={showError}
            onClose={() => this.onCloseError(error.id)}
          />
        )}
        <form className="clearfix" onSubmit={this.onSubmit}>
          <label htmlFor="username" className="Form__Input__Label">
            <span className="sr-only">Username</span>
            <input
              type="text"
              value={username}
              onChange={this.onChangeUsername}
              className="Form__Input"
              placeholder="Username"
              autoComplete="on"
              id="username"
            />
          </label>
          <label htmlFor="password" className="Form__Input__Label">
            <span className="sr-only">Password</span>
            <input
              type="password"
              value={password}
              onChange={this.onChangePassword}
              className="Form__Input"
              placeholder="Password"
              autoComplete="current-password"
              id="password"
            />
          </label>
          <div className="Form__Buttons">
            <input
              type="submit"
              value="Post"
              className="btn btn-primary Form__Button"
              disabled={!valid}
              aria-disabled={!valid}
            />
          </div>
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
  submitted: PropTypes.bool.isRequired,
};
