import 'isomorphic-fetch';

import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

import {
  UPDATE_SETTINGS_FAILURE,
  UPDATE_SETTINGS_REQUEST,
  UPDATE_SETTINGS_SUCCESS,
  updateSettings,
} from '../../../../src/shared/actions/settings';
import { ADD_ERROR } from '../../../../src/shared/actions/error';

const mockStore = configureMockStore([thunkMiddleware]);

afterEach(() => {
  fetchMock.restore();
});

test('settings success', async () => {
  fetchMock.put('/api/settings', 201);
  const store = mockStore({ entities: { login: { user: { id: '1' } } } });
  await store.dispatch(updateSettings('jacob', 'description'));

  expect(store.getActions()[0].type).toBe(UPDATE_SETTINGS_REQUEST);
  expect(store.getActions()[1].type).toBe(UPDATE_SETTINGS_SUCCESS);
});

test('settings failure', async () => {
  fetchMock.put('/api/settings', 500);
  const store = mockStore({ entities: { login: { user: { id: '1' } } } });
  await store.dispatch(updateSettings('jacob', 'description'));

  expect(store.getActions()[0].type).toBe(UPDATE_SETTINGS_REQUEST);
  expect(store.getActions()[1].type).toBe(ADD_ERROR);
  expect(store.getActions()[2].type).toBe(UPDATE_SETTINGS_FAILURE);
});
