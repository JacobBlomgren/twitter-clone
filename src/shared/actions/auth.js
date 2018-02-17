import camelizeKeys from '../utils/camelizeKeys';

import headers from '../utils/fetch/jsonHeaders';
import { addError } from './error';

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
        return dispatch(loginFailure('Something went wrong'));
      });
  };
}

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
function logoutRequest() {
  return { type: LOGOUT_REQUEST };
}

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
function logoutSuccess() {
  return { type: LOGOUT_SUCCESS };
}

export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
function logoutFailure() {
  return { type: LOGOUT_FAILURE };
}

export function logout() {
  return dispatch => {
    dispatch(logoutRequest());
    return fetch('/api/auth/logout', {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => {
        if (!response.ok) throw Error(response.status);
        return dispatch(logoutSuccess());
      })
      .catch(() => {
        dispatch(addError('Something went wrong'));
        return dispatch(logoutFailure());
      });
  };
}
