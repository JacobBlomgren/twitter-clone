import * as R from 'ramda';
import { connect } from 'react-redux';
import NavMenu from '../components/Nav/Mobile/NavMenu';

function mapStateToProps(state) {
  const user = state.entities.users.byID[state.entities.login.user.id];
  if (!user) return {};
  return R.pick(
    [
      'name',
      'username',
      'profilePictureURL',
      'followerCount',
      'followingCount',
    ],
    user,
  );
}

export default connect(mapStateToProps)(NavMenu);
