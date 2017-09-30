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

function merge(key, left, right) {
  if (Array.isArray(left)) return R.union(left, right);
  if (key === 'partial' && !left) return false;
  return right;
}

function mergeUsers(state, users) {
  if (users.length === 0) return state;
  const [user, ...tail] = users;
  return mergeUsers(
    {
      // TODO use set
      allIDs: R.union(state.allIDs, [user.id]),
      byID: R.mergeDeepWithKey(merge, state.byID, { [user.id]: user }),
    },
    tail,
  );
}

function recieveUsers(state, action) {
  return mergeUsers(state, action.users);
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
