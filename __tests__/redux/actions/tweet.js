import 'isomorphic-fetch';

import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import {
  FETCH_TWEET_NOT_FOUND,
  FETCH_TWEET_REQUEST,
  FETCH_TWEET_SUCCESS,
  fetchTweet,
  POST_TWEET_REQUEST,
  POST_TWEET_SUCCESS,
  postTweet,
} from '../../../src/shared/actions/tweet';
import { ADD_ERROR } from '../../../src/shared/actions/error';

const mockStore = configureMockStore([thunkMiddleware]);

afterEach(() => {
  fetchMock.restore();
});

const successResponse = {
  tweet: {
    id: '2',
    username: 'sara',
    name: 'Sara',
    user_id: '2',
    content: 'Second tweet',
    created_at: '2017-09-27T09:47:20.776Z',
    like_count: 0,
    reply_count: 2,
    retweet_count: 0,
    liked: false,
    retweeted: false,
    reply_to: {
      original_tweet_id: '1',
      original_username: 'jacob',
      original_user_id: '1',
    },
  },
  parents: [
    {
      id: '1',
      username: 'jacob',
      name: 'Jacob Blomgren',
      user_id: '1',
      content: 'First tweet',
      created_at: '2017-09-27T09:46:39.434Z',
      like_count: 0,
      reply_count: 3,
      retweet_count: 0,
      liked: false,
      retweeted: false,
      reply_to: null,
    },
  ],
  children: [
    {
      id: '3',
      username: 'jacob',
      name: 'Jacob Blomgren',
      user_id: '1',
      content: 'Third tweet a)',
      created_at: '2017-09-27T09:50:54.201Z',
      like_count: 0,
      reply_count: 0,
      retweet_count: 0,
      liked: false,
      retweeted: false,
      reply_to: {
        original_tweet_id: '2',
        original_username: 'sara',
        original_user_id: '2',
      },
    },
    {
      id: '4',
      username: 'jake',
      name: 'Jake',
      user_id: '3',
      content: 'Third tweet b)',
      created_at: '2017-09-27T09:51:06.684Z',
      like_count: 0,
      reply_count: 0,
      retweet_count: 0,
      liked: false,
      retweeted: false,
      reply_to: {
        original_tweet_id: '2',
        original_username: 'sara',
        original_user_id: '2',
      },
    },
  ],
};

afterEach(() => {
  fetchMock.restore();
});

test('fetch tweet sucess', async () => {
  fetchMock.get(`/api/tweets?tweet_id=2`, {
    body: successResponse,
  });
  const store = mockStore();
  await store.dispatch(fetchTweet(2));

  expect(store.getActions()[0].type).toBe(FETCH_TWEET_REQUEST);
  expect(store.getActions()[1].type).toBe(FETCH_TWEET_SUCCESS);
});

test('fetch tweet not found', async () => {
  fetchMock.get(`/api/tweets?tweet_id=2`, 404);
  const store = mockStore();
  await store.dispatch(fetchTweet(2));

  expect(store.getActions()[0].type).toBe(FETCH_TWEET_REQUEST);
  expect(store.getActions()[1].type).toBe(FETCH_TWEET_NOT_FOUND);
});

test('post tweet success', async () => {
  fetchMock.post('/api/tweets/', {
    id: '1',
    content: 'tweet',
  });
  const store = mockStore();
  await store.dispatch(postTweet('tweet'));
  expect(store.getActions()[0].type).toBe(POST_TWEET_REQUEST);
  expect(store.getActions()[1].type).toBe(POST_TWEET_SUCCESS);
});

test('post tweet failure', async () => {
  fetchMock.post('/api/tweets/', 500);
  const store = mockStore();
  await store.dispatch(postTweet('tweet'));
  expect(store.getActions()[0].type).toBe(POST_TWEET_REQUEST);
  expect(store.getActions()[1].type).toBe(ADD_ERROR);
});
