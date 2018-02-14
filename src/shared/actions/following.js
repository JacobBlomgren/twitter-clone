import headers from '../utils/fetch/jsonHeaders';
import { addError } from './error';
import camelizeKeys from '../utils/camelizeKeys';
import decamelizeKeys from '../utils/decamelizeKeys';
import { normalizePartialUsers } from './normalization';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
function followRequest(userID) {
  return {
    type: FOLLOW_REQUEST,
    userID,
  };
}

export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
function followSuccess(userID) {
  return {
    type: FOLLOW_SUCCESS,
    userID,
  };
}

export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';
function followFailure(userID) {
  return {
    type: FOLLOW_FAILURE,
    userID,
  };
}

export function follow(userID) {
  return dispatch => {
    dispatch(followRequest(userID));
    return fetch('/api/following/', {
      method: 'POST',
      headers,
      body: JSON.stringify(decamelizeKeys({ userID })),
      credentials: 'include',
    }).then(response => {
      if (response.ok) return dispatch(followSuccess(userID));
      dispatch(addError('Follow failed'));
      return dispatch(followFailure(userID));
    });
  };
}

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
function unfollowRequest(userID) {
  return {
    type: UNFOLLOW_REQUEST,
    userID,
  };
}

export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
function unfollowSuccess(userID) {
  return {
    type: UNFOLLOW_SUCCESS,
    userID,
  };
}

export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';
function unfollowFailure(userID) {
  return {
    type: UNFOLLOW_FAILURE,
    userID,
  };
}

export function unfollow(userID) {
  return dispatch => {
    dispatch(unfollowRequest(userID));
    return fetch('/api/following/', {
      method: 'DELETE',
      headers,
      body: JSON.stringify(decamelizeKeys({ userID })),
      credentials: 'include',
    }).then(response => {
      if (response.ok) return dispatch(unfollowSuccess(userID));
      dispatch(addError('Follow failed'));
      return dispatch(unfollowFailure(userID));
    });
  };
}

export const FETCH_FOLLOWING_REQUEST = 'FETCH_FOLLOWING_REQUEST';
function fetchFollowingRequest() {
  return { type: FETCH_FOLLOWING_REQUEST };
}

export const FETCH_FOLLOWING_SUCCESS = 'FETCH_FOLLOWING_SUCCESS';
function fetchFollowingSuccess(following) {
  const normalized = normalizePartialUsers(camelizeKeys(following));
  return {
    type: FETCH_FOLLOWING_SUCCESS,
    recievedAt: Date.now(),
    ...normalized,
  };
}
export const FETCH_FOLLOWING_FAILURE = 'FETCH_FOLLOWING_FAILURE';
function fetchFollowingFailure() {
  return {
    type: FETCH_FOLLOWING_FAILURE,
  };
}

export function fetchFollowing() {
  return dispatch => {
    dispatch(fetchFollowingRequest());
    return fetch('/api/following', {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => {
        if (!response.ok) throw Error(response.status);
        return response.json();
      })
      .then(json => dispatch(fetchFollowingSuccess(json)))
      .catch(() => {
        dispatch(fetchFollowingFailure());
        return dispatch(addError("Couldn't fetch data"));
      });
  };
}
