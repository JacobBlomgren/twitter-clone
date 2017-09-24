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

function recieveProfile(state, action) {
  return {
    allIDs: R.union(state.allIDs, [action.user.id]),
    byID: {
      ...state.byID,
      [action.user.id]: action.user,
    },
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
      return recieveProfile(state, action);
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
