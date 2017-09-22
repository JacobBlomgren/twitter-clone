import R from 'ramda';

import { FETCH_PROFILE_SUCCESS } from '../../actions/profile';
import { FOLLOW_FAILURE, FOLLOW_REQUEST } from '../../actions/follow';

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

function followUser(state, action) {
  const user = state.byID[action.userID];
  if (!user || user.follows) return state;
  const newUser = {
    ...user,
    follows: true,
    followerCount: user.followerCount + 1,
  };
  return replaceUser(state, newUser);
}

function unfollowUser(state, action) {
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
    case FOLLOW_REQUEST:
      return followUser(state, action);
    case FOLLOW_FAILURE:
      return unfollowUser(state, action);
    default:
      return state;
  }
}
