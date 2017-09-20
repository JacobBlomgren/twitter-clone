import 'isomorphic-fetch';

import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import {
  follow,
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
} from '../../../src/client/actions/follow';
import { ADD_ERROR } from '../../../src/client/actions/error';

const mockStore = configureMockStore([thunkMiddleware]);

afterEach(() => {
  fetchMock.restore();
});

test('follow success', async () => {
  fetchMock.post('/api/following/', 200);

  const store = mockStore();
  await store.dispatch(follow('1'));

  expect(store.getActions()[0].type).toBe(FOLLOW_REQUEST);
  expect(store.getActions()[1].type).toBe(FOLLOW_SUCCESS);
});

test('follow failure', async () => {
  fetchMock.post('/api/following/', 500);

  const store = mockStore();
  await store.dispatch(follow('1'));

  expect(store.getActions()[0].type).toBe(FOLLOW_REQUEST);
  expect(store.getActions()[1].type).toBe(ADD_ERROR);
  expect(store.getActions()[2].type).toBe(FOLLOW_FAILURE);
});
