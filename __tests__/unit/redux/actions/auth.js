import 'isomorphic-fetch';

import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import {
  login,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  logout,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
} from '../../../../src/shared/actions/auth';

const mockStore = configureMockStore([thunkMiddleware]);

afterEach(() => {
  fetchMock.restore();
});

describe('login', () => {
  test('login success', async () => {
    fetchMock.post('/api/auth/login', {
      user_id: '1',
      username: 'jacob',
    });

    const store = mockStore();
    await store.dispatch(login('username', 'password'));

    expect(store.getActions()[0].type).toBe(LOGIN_REQUEST);
    expect(store.getActions()[1].type).toBe(LOGIN_SUCCESS);
  });

  test('login failure', async () => {
    fetchMock.post('/api/auth/login', 401);

    const store = mockStore();
    await store.dispatch(login('username', 'password'));

    expect(store.getActions()[0].type).toBe(LOGIN_REQUEST);
    expect(store.getActions()[1].type).toBe(LOGIN_FAILURE);
  });

  test('login repeated failure', async () => {
    fetchMock.post('/api/auth/login', 401);

    const store = mockStore();
    await store.dispatch(login('username', 'password'));
    await store.dispatch(login('username', 'password'));

    expect(store.getActions()[0].type).toBe(LOGIN_REQUEST);
    expect(store.getActions()[1].type).toBe(LOGIN_FAILURE);
    expect(store.getActions()[2].type).toBe(LOGIN_REQUEST);
    expect(store.getActions()[3].type).toBe(LOGIN_FAILURE);
    expect(store.getActions()[1].errorID).not.toEqual(
      store.getActions()[3].errorID,
    );
  });
});

describe('log out', () => {
  test('log out success', async () => {
    fetchMock.get('/api/auth/logout', 200);

    const store = mockStore();
    await store.dispatch(logout());

    expect(store.getActions()[0].type).toBe(LOGOUT_REQUEST);
    expect(store.getActions()[1].type).toBe(LOGOUT_SUCCESS);
  });

  test('log out failure', async () => {
    fetchMock.get('/api/auth/logout', 401);

    const store = mockStore();
    await store.dispatch(logout());

    expect(store.getActions()[0].type).toBe(LOGOUT_REQUEST);
    expect(store.getActions()).toContainEqual({ type: LOGOUT_FAILURE });
  });
});
