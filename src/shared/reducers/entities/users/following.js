import * as R from 'ramda';

import {
  FETCH_FOLLOWING_FAILURE,
  FETCH_FOLLOWING_REQUEST,
  FETCH_FOLLOWING_SUCCESS,
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
} from '../../../actions/following';
import { FETCH_PROFILE_SUCCESS } from '../../../actions/profile';

function addFollow(state, usersByID, action) {
  if (!usersByID[action.userID]) return state;
  return R.union(state, action.userID);
}

function removeFollow(state, usersByID, action) {
  if (!usersByID[action.userID]) return state;
  return R.without([action.userID], state);
}

function allIDs(state = [], usersByID, action) {
  switch (action.type) {
    // We add a follow at the request for immediate feedback, and remove it on failure
    case FOLLOW_REQUEST:
    case UNFOLLOW_FAILURE:
      return addFollow(state, usersByID, action);
    case UNFOLLOW_REQUEST:
    case FOLLOW_FAILURE:
      return removeFollow(state, usersByID, action);
    case FETCH_FOLLOWING_SUCCESS:
    case FETCH_PROFILE_SUCCESS:
      return R.union(state, action.following);
    default:
      return state;
  }
}

function isFetching(state = false, action) {
  switch (action.type) {
    case FETCH_FOLLOWING_REQUEST:
      return true;
    case FETCH_FOLLOWING_FAILURE:
    case FETCH_FOLLOWING_SUCCESS:
      return false;
    default:
      return state;
  }
}

function recievedAt(state = 0, action) {
  if (action.type === FETCH_FOLLOWING_SUCCESS) return action.recievedAt;
  return state;
}

export default function(state, usersByID, action) {
  if (typeof state === 'undefined')
    return {
      allIDs: allIDs(undefined, {}, action),
      isFetching: isFetching(undefined, action),
      recievedAt: recievedAt(undefined, action),
    };
  return {
    allIDs: allIDs(state.allIDs, usersByID, action),
    isFetching: isFetching(state.isFetching, action),
    recievedAt: recievedAt(state.recievedAt, action),
  };
}
