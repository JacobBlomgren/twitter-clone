import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { logout } from '../actions/auth';
import Logout from '../components/Auth/Logout/Logout';

function mapStateToProps(state) {
  return {
    fetching: state.network.auth.logout.fetching,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout));
