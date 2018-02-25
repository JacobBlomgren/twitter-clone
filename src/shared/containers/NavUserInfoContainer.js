import * as R from 'ramda';
import { connect } from 'react-redux';

import NavUserInfo from '../components/Nav/Desktop/NavUserInfo';

function mapStateToProps(state) {
  const user = state.entities.users.byID[state.entities.login.user.id];
  if (!user) return { loading: true };
  return {
    ...R.pick(['name', 'username', 'profilePictureURL'], user),
    loading: false,
  };
}

export default connect(mapStateToProps)(NavUserInfo);
