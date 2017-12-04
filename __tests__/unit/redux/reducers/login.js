import 'isomorphic-fetch';

import login from '../../../../src/shared/reducers/entities/login';
import {LOGIN_FAILURE, LOGIN_SUCCESS} from '../../../../src/shared/actions/auth';

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
  const state = login(undefined, {
    type: LOGIN_FAILURE,
    message: 'Invalid username or password',
    errorID: '1',
  });
  const { id, message } = state.error;
  expect(id).toEqual('1');
  expect(message).toEqual('Invalid username or password');
})
