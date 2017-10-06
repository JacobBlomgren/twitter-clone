import R from 'ramda';
import { combineReducers } from 'redux';

import {
  FETCH_PROFILE_NOT_FOUND,
  FETCH_PROFILE_SUCCESS,
} from '../../actions/profile';
import {
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
} from '../../actions/follow';
import { FETCH_TWEET_SUCCESS } from '../../actions/tweetDetails';

function merge(key, left, right) {
  if (Array.isArray(left)) return R.union(left, right);
  if (key === 'partial' && !left) return false;
  return right;
}

function mergeUsers(state, users) {
  if (users.length === 0) return state;
  const [user, ...tail] = users;
  return mergeUsers(
    R.mergeDeepWithKey(merge, state, { [user.id]: user }),
    tail,
  );
}

function recieveUsers(state, action) {
  return mergeUsers(state, action.users);
}

function replaceUser(state, user) {
  return {
    ...state,
    [user.id]: user,
  };
}

function addFollow(state, action) {
  const user = state[action.userID];
  if (!user || user.follows) return state;
  const newUser = {
    ...user,
    follows: true,
    followerCount: user.followerCount + 1,
  };
  return replaceUser(state, newUser);
}

function removeFollow(state, action) {
  const user = state[action.userID];
  if (!user || !user.follows) return state;
  const newUser = {
    ...user,
    follows: false,
    followerCount: user.followerCount - 1,
  };
  return replaceUser(state, newUser);
}

function byID(state = {}, action) {
  switch (action.type) {
    case FETCH_PROFILE_SUCCESS:
    case FETCH_TWEET_SUCCESS:
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

function allIDs(state = [], action) {
  switch (action.type) {
    case FETCH_PROFILE_SUCCESS:
      return R.union(state, action.users.map(R.prop('id')));
    default:
      return state;
  }
}

// updates the list of not found users with the newly recieved users.
function updateNotFound(state, users) {
  if (Object.keys(state).length === 0) return state;
  return R.filter(u => R.none(R.propEq('username', u.username), users), state);
}

function notFound(state = {}, action) {
  switch (action.type) {
    case FETCH_PROFILE_NOT_FOUND:
      return {
        ...state,
        [action.username]: { username: action.username, time: action.time },
      };
    case FETCH_PROFILE_SUCCESS:
      return updateNotFound(state, action.users);
    default:
      return state;
  }
}

export default combineReducers({
  byID,
  allIDs,
  notFound,
});
