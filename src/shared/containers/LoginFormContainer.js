import { connect } from 'react-redux';

import { login } from '../actions/auth';
import LoginForm from '../components/Login/LoginForm';

function mapStateToProps(state) {
  return {
    error: state.entities.login.error,
    loggedIn: typeof state.entities.login.user !== 'undefined',
    submitted: state.network.auth.login,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: (username, password) => dispatch(login(username, password)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
