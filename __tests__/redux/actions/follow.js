import 'isomorphic-fetch';

import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import {
  follow,
  unfollow,
  fetchFollowing,
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  FETCH_FOLLOWING_REQUEST,
  FETCH_FOLLOWING_SUCCESS, FETCH_FOLLOWING_FAILURE,
} from '../../../src/shared/actions/following';
import { ADD_ERROR } from '../../../src/shared/actions/error';

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

test('unfollow success', async () => {
  fetchMock.delete('/api/following/', 200);

  const store = mockStore();
  await store.dispatch(unfollow('1'));

  expect(store.getActions()[0].type).toBe(UNFOLLOW_REQUEST);
  expect(store.getActions()[1].type).toBe(UNFOLLOW_SUCCESS);
});

test('unfollow failure', async () => {
  fetchMock.delete('/api/following/', 500);

  const store = mockStore();
  await store.dispatch(unfollow('1'));

  expect(store.getActions()[0].type).toBe(UNFOLLOW_REQUEST);
  expect(store.getActions()[1].type).toBe(ADD_ERROR);
  expect(store.getActions()[2].type).toBe(UNFOLLOW_FAILURE);
});

test('fetch following success', async () => {
  fetchMock.get('/api/following', {
    status: 200,
    body: [
      {
        id: '1',
        username: 'jacob',
        name: 'Jacob',
        profile_picture_url: 'me.png',
      },
    ],
  });

  const store = mockStore();
  await store.dispatch(fetchFollowing());

  expect(store.getActions()[0].type).toBe(FETCH_FOLLOWING_REQUEST);
  expect(store.getActions()[1].type).toBe(FETCH_FOLLOWING_SUCCESS);
});

test('fetch following success', async () => {
  fetchMock.get('/api/following', 500);

  const store = mockStore();
  await store.dispatch(fetchFollowing());

  expect(store.getActions()[0].type).toBe(FETCH_FOLLOWING_REQUEST);
  expect(store.getActions()[1].type).toBe(FETCH_FOLLOWING_FAILURE);
  expect(store.getActions()[2].type).toBe(ADD_ERROR);
});
