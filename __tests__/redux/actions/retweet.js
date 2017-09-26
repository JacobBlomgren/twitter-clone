import 'isomorphic-fetch';

import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import {
  RETWEET_FAILURE,
  RETWEET_REQUEST,
  RETWEET_SUCCESS,
  retweet,
  REMOVE_RETWEET_FAILURE,
  REMOVE_RETWEET_REQUEST,
  REMOVE_RETWEET_SUCCESS,
  removeRetweet,
} from '../../../src/shared/actions/retweet';
import { ADD_ERROR } from '../../../src/shared/actions/error';

const mockStore = configureMockStore([thunkMiddleware]);

afterEach(() => {
  fetchMock.restore();
});

test('retweet success', async () => {
  const tweetID = '1';
  fetchMock.post('/api/retweets/', {
    body: { status: `Retweeted ${tweetID}` },
  });
  const store = mockStore();
  await store.dispatch(retweet(tweetID));

  expect(store.getActions()[0].type).toBe(RETWEET_REQUEST);
  expect(store.getActions()[1].type).toBe(RETWEET_SUCCESS);
});

test('retweet failure', async () => {
  const tweetID = '1';
  fetchMock.post('/api/retweets/', 500);
  const store = mockStore();
  await store.dispatch(retweet(tweetID));

  expect(store.getActions()[0].type).toBe(RETWEET_REQUEST);
  expect(store.getActions()[1].type).toBe(ADD_ERROR);
  expect(store.getActions()[2].type).toBe(RETWEET_FAILURE);
});

test('remove retweet success', async () => {
  const tweetID = '1';
  fetchMock.delete('/api/retweets/', 200);
  const store = mockStore();
  await store.dispatch(removeRetweet(tweetID));

  expect(store.getActions()[0].type).toBe(REMOVE_RETWEET_REQUEST);
  expect(store.getActions()[1].type).toBe(REMOVE_RETWEET_SUCCESS);
});

test('remove retweet failure', async () => {
  const tweetID = '1';
  fetchMock.delete('/api/retweets/', 500);
  const store = mockStore();
  await store.dispatch(removeRetweet(tweetID));

  expect(store.getActions()[0].type).toBe(REMOVE_RETWEET_REQUEST);
  expect(store.getActions()[1].type).toBe(ADD_ERROR);
  expect(store.getActions()[2].type).toBe(REMOVE_RETWEET_FAILURE);
});
