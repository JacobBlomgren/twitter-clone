import React from 'react';
import { connect } from 'react-redux';

import { login } from '../actions/auth';
import LoginForm from '../components/Login/LoginForm';

function mapDispatchToProps(dispatch) {
  return {
    login: (username, password) => dispatch(login(username, password)),
  };
}

export default connect(null, mapDispatchToProps)(LoginForm);
