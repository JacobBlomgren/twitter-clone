import camelizeKeys from '../utils/camelizeKeys';
import { addError } from './error';

import headers from '../utils/fetch/jsonHeaders';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
function loginRequest(username) {
  return {
    type: LOGIN_REQUEST,
    username,
  };
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export function loginSuccess(json) {
  const { userID, username } = camelizeKeys(json);
  return {
    type: LOGIN_SUCCESS,
    userID,
    username,
  };
}

// Assign ids to error so that the UI can know if the error is a new or old one (on repeated failed logins).
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
  return dispatch => {
    dispatch(loginRequest(username));
    return fetch('/api/auth/login', {
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
  };
}
