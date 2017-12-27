import { connect } from 'react-redux';

/**
 * A Redux-connected container that inserts the boolean prop loggedIn.
 */
export default connect(state => ({
  loggedIn: typeof state.entities.login.user !== 'undefined',
}));
