import { connect } from 'react-redux';
import HomePage from '../components/page/HomePage';

export default connect(state => ({
  loggedIn: typeof state.entities.login.user !== 'undefined',
}))(HomePage);
