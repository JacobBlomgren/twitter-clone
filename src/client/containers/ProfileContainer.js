import { connect } from 'react-redux';

import Profile from '../components/Profile';

function mapStateToProps(state, { userID }) {
  const user = state.entities.users.byID[userID];
  return { ...user };
}

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
