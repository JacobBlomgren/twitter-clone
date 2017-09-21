import headers from '../utils/fetch/jsonHeaders';
import { addError } from './error';
import decamelizeKeys from '../utils/decamelizeKeys';

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
