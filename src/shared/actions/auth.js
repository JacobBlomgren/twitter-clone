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

let errorID = 0;

export const LOGIN_FAILURE = 'LOGIN_FAILURE';
function loginFailure(message) {
  errorID += 1;
  return {
    type: LOGIN_FAILURE,
    message,
    errorID,
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
        if (!response.ok) throw Error(response.status);
        return response.json();
      })
      .then(json => dispatch(loginSuccess(json)))
      .catch(err => {
        if (err.message === '401')
          return dispatch(loginFailure('Invalid username or password'));
        // Don't dispatch a login failure as it wasn't a client error.
        return dispatch(addError('Something went wrong'));
      });
}
