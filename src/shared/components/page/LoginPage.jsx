import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
  }

  onChangeUsername(e) {
    this.setState({ username: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    const { username, password } = this.state;
    return (
      <form className="Login__Form clearfix">
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

export default function Login() {
  return (
    <main className="MainColumn MainColumn--Narrow">
      <div className="Login">
        <h1 className="Login__Heading">Login</h1>
        <LoginForm />
      </div>
    </main>
  );
}

Login.propTypes = {};
