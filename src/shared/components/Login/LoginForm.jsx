import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.login = this.props.login;
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
    const { username, password } = this.state;
    return (
      <form className="Login__Form clearfix" onSubmit={this.onSubmit}>
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
        />
      </form>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};
