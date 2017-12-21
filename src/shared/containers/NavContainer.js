import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Nav from '../components/Nav/Nav';

export default withRouter(
  connect(state => ({
    loggedIn: typeof state.entities.login.user !== 'undefined',
  }))(Nav),
);
