import R from 'ramda';

import { FETCH_PROFILE_SUCCESS } from '../../actions/profile';
import {
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
} from '../../actions/follow';

function replaceUser(state, user) {
  return {
    ...state,
    byID: {
      ...state.byID,
      [user.id]: user,
    },
  };
}

function recieveUsers(state, action) {
  const IDs = action.users.map(R.prop('id'));
  // Remove users for which we already have non-partial data.
  const filterPartial = R.reject(u => u.partial && state.byID[u.id]);
  const byID = R.reduce((users, u) => R.merge(users, { [u.id]: u }), {});
  return {
    allIDs: R.union(state.allIDs, IDs),
    byID: R.merge(state.byID, R.compose(byID, filterPartial)(action.users)),
  };
}

function addFollow(state, action) {
  const user = state.byID[action.userID];
  if (!user || user.follows) return state;
  const newUser = {
    ...user,
    follows: true,
    followerCount: user.followerCount + 1,
  };
  return replaceUser(state, newUser);
}

function removeFollow(state, action) {
  const user = state.byID[action.userID];
  if (!user || !user.follows) return state;
  const newUser = {
    ...user,
    follows: false,
    followerCount: user.followerCount - 1,
  };
  return replaceUser(state, newUser);
}

export default function(state = { byID: {}, allIDs: [] }, action) {
  switch (action.type) {
    case FETCH_PROFILE_SUCCESS:
      return recieveUsers(state, action);
    // We add a follow at the request for immediate feedback, and remove it on failure
    case FOLLOW_REQUEST:
    case UNFOLLOW_FAILURE:
      return addFollow(state, action);
    case UNFOLLOW_REQUEST:
    case FOLLOW_FAILURE:
      return removeFollow(state, action);
    default:
      return state;
  }
}
