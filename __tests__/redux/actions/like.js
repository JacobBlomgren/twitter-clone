import 'isomorphic-fetch';

import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import {
  LIKE_TWEET_FAILURE,
  LIKE_TWEET_REQUEST,
  LIKE_TWEET_SUCCESS,
  likeTweet,
} from '../../../src/client/actions/like';

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
  expect(store.getActions()[0].type).toBe(LIKE_TWEET_SUCCESS);
});

test('like failure', async () => {
  const tweetID = '1';
  fetchMock.post('/api/likes/', 500);
  const store = mockStore();
  await store.dispatch(likeTweet(tweetID));

  expect(store.getActions()[0].type).toBe(LIKE_TWEET_REQUEST);
  expect(store.getActions()[0].type).toBe(LIKE_TWEET_FAILURE);
});
