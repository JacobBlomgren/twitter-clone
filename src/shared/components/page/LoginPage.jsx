import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LoginFormContainer from '../../containers/LoginFormContainer';

export default function Login() {
  return (
    <main className="MainColumn MainColumn--Narrow">
      <div className="Login">
        <h1 className="Login__Heading">Login</h1>
        <LoginFormContainer />
      </div>
    </main>
  );
}

Login.propTypes = {};
