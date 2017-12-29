import { connect } from 'react-redux';
import * as R from 'ramda';

import Settings from '../components/Settings/Settings';
import { updateSettings } from '../actions/settings';

function mapStateToProps(state) {
  const loggedInUserID =
    state.entities.login.user && state.entities.login.user.id;
  const user = state.entities.users.byID[loggedInUserID];
  // the profile is fetched upon login and if the user data can't be found yet,
  // then it's being fetched.
  if (!user) return { fetching: true };
  return R.pick(['name', 'description'], user);
}

function mapDispatchToProps(dispatch) {
  return {
    updateSettings: (name, description) =>
      dispatch(updateSettings(name, description)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
