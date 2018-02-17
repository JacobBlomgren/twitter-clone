import 'isomorphic-fetch';

import login from '../../../../src/shared/reducers/entities/login';
import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
} from '../../../../src/shared/actions/auth';

test('login', () => {
  const state = login(undefined, {
    type: LOGIN_SUCCESS,
    userID: '1',
    username: 'jacob',
  });
  const { id, username } = state.user;
  expect(id).toEqual('1');
  expect(username).toEqual('jacob');
});

test('login failure', () => {
  const { error: { id, message } } = login(undefined, {
    type: LOGIN_FAILURE,
    message: 'Invalid username or password',
    errorID: '1',
  });
  expect(id).toEqual('1');
  expect(message).toEqual('Invalid username or password');
});

test('logout', () => {
  const state = login({ id: '1', username: 'jacob' }, { type: LOGOUT_SUCCESS });
  expect(state).toEqual({});
});

test('log out failure should leave it as is', () => {
  const initState = { id: '1', username: 'jacob' };
  const state = login(initState, { type: LOGOUT_FAILURE });
  expect(state).toEqual(initState);
});
