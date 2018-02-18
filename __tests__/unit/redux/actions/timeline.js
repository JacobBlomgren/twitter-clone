import 'isomorphic-fetch';

import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import {
  FETCH_TIMELINE_FAILURE,
  FETCH_TIMELINE_REQUEST,
  FETCH_TIMELINE_SUCCESS,
  fetchTimeline,
} from '../../../../src/shared/actions/timeline';
import { ADD_ERROR } from '../../../../src/shared/actions/error';

const mockStore = configureMockStore([thunkMiddleware]);

afterEach(() => {
  fetchMock.restore();
});

test('timeline success', async () => {
  fetchMock.get('/api/timeline', []);
  const store = mockStore();
  await store.dispatch(fetchTimeline());

  expect(store.getActions()[0].type).toBe(FETCH_TIMELINE_REQUEST);
  expect(store.getActions()[1].type).toBe(FETCH_TIMELINE_SUCCESS);
});

test('timeline failure', async () => {
  fetchMock.get('/api/timeline', 500);
  const store = mockStore();
  await store.dispatch(fetchTimeline());

  expect(store.getActions()[0].type).toBe(FETCH_TIMELINE_REQUEST);
  expect(store.getActions()[1].type).toBe(FETCH_TIMELINE_FAILURE);
  expect(store.getActions()[2].type).toBe(ADD_ERROR);
});
