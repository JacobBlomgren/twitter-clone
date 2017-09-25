import 'isomorphic-fetch';

import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import {
  fetchUser,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
} from '../../../src/shared/actions/profile';

const mockStore = configureMockStore([thunkMiddleware]);

const username = 'jacob';

const successResponse = {
  id: '1',
  name: 'Jacob Blomgren',
  username,
  description: "I'm a programmer from Stockholm.",
  tweets: [
    {
      id: '1',
      username,
      name: 'Jacob Blomgren',
      user_id: '1',
      content: 'a tweet',
    },
    {
      id: '3',
      username,
      name: 'Jacob Blomgren',
      user_id: '1',
      content: 'A second tweet',
      replyTo: {
        original_tweet_id: '2',
        original_user_id: '2',
        original_username: 'sara',
      },
    },
  ],
};

afterEach(() => {
  fetchMock.restore();
});

describe('fetch user sucess', () => {
  test('action dispatch', async () => {
    fetchMock.get(`/api/user?username=${username}`, {
      body: successResponse,
    });
    const store = mockStore();
    await store.dispatch(fetchUser(username));

    expect(store.getActions()[0].type).toBe(FETCH_PROFILE_REQUEST);
    expect(store.getActions()[1].type).toBe(FETCH_PROFILE_SUCCESS);
  });

  test('normalization', async () => {
    fetchMock.get(`/api/user?username=${username}`, {
      body: successResponse,
    });
    const store = mockStore();
    await store.dispatch(fetchUser(username));

    const action = store.getActions()[1];

    // Probably shouldn't test based on order.
    expect(action.users[0].id).toBe('2');
    expect(action.users[0].username).toBe('sara');
    expect(action.users[1].id).toBe('1');
    expect(action.users[1].tweets).toContain('1');
    expect(action.users[1].tweets).toContain('3');

    expect(action.tweets[0]).not.toHaveProperty('name');
    expect(action.tweets[0]).not.toHaveProperty('username');
    expect(action.tweets[1].replyTo).toBe('2');
  });
});
