import camelizeKeys from '../utils/camelizeKeys';
import { addError } from './error';

import headers from '../utils/fetch/jsonHeaders';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
function loginRequest() {}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
function loginSuccess(json) {
  const { userID, username } = camelizeKeys(json);
  return {
    type: LOGIN_SUCCESS,
    userID,
    username,
  };
}

export const LOGIN_FAILURE = 'LOGIN_FAILURE';
function loginFailure() {
  return {
    type: LOGIN_FAILURE,
  };
}

export function login(username, password) {
  return dispatch =>
    fetch('/api/auth/login', {
      method: 'POST',
      headers,
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    })
      .then(response => {
        if (!response.ok) return dispatch(loginFailure());
        return response.json();
      })
      .then(json => dispatch(loginSuccess(json)));
}
