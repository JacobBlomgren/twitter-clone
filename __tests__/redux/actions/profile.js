import 'isomorphic-fetch';

import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import {
  fetchUser,
  PROFILE_REQUEST,
  RECIEVE_PROFILE_SUCCESS,
} from '../../../src/client/actions/profile';

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
      user_id: '7',
      content: 'a tweet',
    },
    {
      id: '2',
      username,
      name: 'Jacob Blomgren',
      user_id: '7',
      content: 'A second tweet',
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

    expect(store.getActions()[0].type).toBe(PROFILE_REQUEST);
    expect(store.getActions()[1].type).toBe(RECIEVE_PROFILE_SUCCESS);
  });

  test('normalization', async () => {
    fetchMock.get(`/api/user?username=${username}`, {
      body: successResponse,
    });
    const store = mockStore();
    await store.dispatch(fetchUser(username));

    const action = store.getActions()[1];

    expect(action.user.id).toBe('1');
    expect(action.user.tweets).toContain('1');
    expect(action.user.tweets).toContain('2');

    expect(action.tweets[0]).not.toHaveProperty('name');
    expect(action.tweets[0]).not.toHaveProperty('username');
  });
});
