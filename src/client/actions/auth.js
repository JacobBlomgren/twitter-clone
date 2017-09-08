export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
function loginSuccess(json) {
  const { user_id, username } = json;
  return {
    type: LOGIN_SUCCESS,
    userID: user_id,
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
      .then(response =>
        // TODO check response.ok
        response.json(),
      )
      .then(json => dispatch(loginSuccess(json)));
}
