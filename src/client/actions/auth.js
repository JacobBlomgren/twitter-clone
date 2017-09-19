import camelizeKeys from '../utils/camelizeKeys';
import { showError } from './error';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
function loginSuccess(json) {
  const { userID, username } = camelizeKeys(json);
  return {
    type: LOGIN_SUCCESS,
    userID,
    username,
  };
}

const headers = new Headers();
headers.append('Content-Type', 'application/json');

export function login(username, password) {
  return dispatch =>
    fetch('/api/auth/login', {
      method: 'POST',
      headers,
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    })
      .then(response => {
        if (!response.ok) return dispatch(showError('Login failed'));
        return response.json();
      })
      .then(json => dispatch(loginSuccess(json)));
}
