import 'isomorphic-fetch';

import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import {
  LIKE_TWEET_FAILURE,
  LIKE_TWEET_REQUEST,
  LIKE_TWEET_SUCCESS,
  likeTweet,
  UNLIKE_TWEET_FAILURE,
  UNLIKE_TWEET_REQUEST,
  UNLIKE_TWEET_SUCCESS,
  unlikeTweet,
} from '../../../../src/shared/actions/like';
import { ADD_ERROR } from '../../../../src/shared/actions/error';

const mockStore = configureMockStore([thunkMiddleware]);

afterEach(() => {
  fetchMock.restore();
});

test('like success', async () => {
  const tweetID = '1';
  fetchMock.post('/api/likes/', { body: { status: `Liked ${tweetID}` } });
  const store = mockStore();
  await store.dispatch(likeTweet(tweetID));

  expect(store.getActions()[0].type).toBe(LIKE_TWEET_REQUEST);
  expect(store.getActions()[1].type).toBe(LIKE_TWEET_SUCCESS);
});

test('like failure', async () => {
  const tweetID = '1';
  fetchMock.post('/api/likes/', 500);
  const store = mockStore();
  await store.dispatch(likeTweet(tweetID));

  expect(store.getActions()[0].type).toBe(LIKE_TWEET_REQUEST);
  expect(store.getActions()[1].type).toBe(ADD_ERROR);
  expect(store.getActions()[2].type).toBe(LIKE_TWEET_FAILURE);
});

test('unlike success', async () => {
  const tweetID = '1';
  fetchMock.delete('/api/likes/', 200);
  const store = mockStore();
  await store.dispatch(unlikeTweet(tweetID));

  expect(store.getActions()[0].type).toBe(UNLIKE_TWEET_REQUEST);
  expect(store.getActions()[1].type).toBe(UNLIKE_TWEET_SUCCESS);
});

test('unlike failure', async () => {
  const tweetID = '1';
  fetchMock.delete('/api/likes/', 500);
  const store = mockStore();
  await store.dispatch(unlikeTweet(tweetID));

  expect(store.getActions()[0].type).toBe(UNLIKE_TWEET_REQUEST);
  expect(store.getActions()[1].type).toBe(ADD_ERROR);
  expect(store.getActions()[2].type).toBe(UNLIKE_TWEET_FAILURE);
});
