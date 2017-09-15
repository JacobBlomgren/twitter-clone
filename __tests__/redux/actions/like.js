import 'isomorphic-fetch';

import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import {
  likeTweet,
  likeTweetFailure,
  likeTweetRequest,
  likeTweetSucess,
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

  expect(store.getActions()).toEqual([
    likeTweetRequest(tweetID),
    likeTweetSucess(tweetID),
  ]);
});

test('like failure', async () => {
  const tweetID = '1';
  fetchMock.post('/api/likes/', 500);
  const store = mockStore();
  await store.dispatch(likeTweet(tweetID));

  expect(store.getActions()).toEqual([
    likeTweetRequest(tweetID),
    likeTweetFailure(tweetID),
  ]);
});
