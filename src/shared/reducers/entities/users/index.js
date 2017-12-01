import * as R from 'ramda';

import followingReducer from './following';
import {
  FETCH_PROFILE_NOT_FOUND,
  FETCH_PROFILE_SUCCESS,
} from '../../../actions/profile';
import {
  FETCH_FOLLOWING_SUCCESS,
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
} from '../../../actions/following';
import { FETCH_TWEET_SUCCESS } from '../../../actions/tweet';
import { LOGIN_SUCCESS } from '../../../actions/auth';

function merge(key, left, right) {
  if (Array.isArray(left)) return R.union(left, right);
  // same as in tweets, if we have already non-partial data, it's still non-partial regardless of the
  // new data.
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

function addFollow(state, followingAllIDs, action) {
  const user = state[action.userID];
  if (!user || followingAllIDs.includes(user.id)) return state;
  const newUser = {
    ...user,
    followerCount: user.followerCount + 1,
  };
  return replaceUser(state, newUser);
}

function removeFollow(state, followingAllIDs, action) {
  const user = state[action.userID];
  if (!user || !followingAllIDs.includes(user.id)) return state;
  const newUser = {
    ...user,
    followerCount: user.followerCount - 1,
  };
  return replaceUser(state, newUser);
}

// Invalidates follows data for users on login.
function invalidateOnLogin(state) {
  // prettier-ignore
  return R.map(
    R.pipe(
      R.omit(['follows']),
      R.assoc('partial', true),
    ),
    state,
  );
}

function byID(state = {}, followingAllIDs, action) {
  switch (action.type) {
    case FETCH_PROFILE_SUCCESS:
    case FETCH_TWEET_SUCCESS:
    case FETCH_FOLLOWING_SUCCESS:
      return recieveUsers(state, action);
    // We add a follow at the request for immediate feedback, and remove it on failure
    case FOLLOW_REQUEST:
    case UNFOLLOW_FAILURE:
      return addFollow(state, followingAllIDs, action);
    case UNFOLLOW_REQUEST:
    case FOLLOW_FAILURE:
      return removeFollow(state, followingAllIDs, action);
    case LOGIN_SUCCESS:
      return invalidateOnLogin(state);
    default:
      return state;
  }
}

function allIDs(state = [], action) {
  switch (action.type) {
    case FETCH_PROFILE_SUCCESS:
    case FETCH_TWEET_SUCCESS:
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
    case FETCH_TWEET_SUCCESS:
      return updateNotFound(state, action.users);
    default:
      return state;
  }
}

export default function(state, action) {
  if (typeof state === 'undefined')
    return {
      byID: byID(undefined, [], action),
      allIDs: allIDs(undefined, action),
      notFound: notFound(undefined, action),
      following: followingReducer(undefined, {}, action),
    };
  return {
    byID: byID(state.byID, state.following.allIDs, action),
    allIDs: allIDs(state.allIDs, action),
    notFound: notFound(state.notFound, action),
    following: followingReducer(state.following, state.byID, action),
  };
}
