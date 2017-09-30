import 'isomorphic-fetch';
import R from 'ramda';

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
    {
      id: '4',
      username,
      name: 'Jacob Blomgren',
      user_id: '1',
      content: 'Another reply to the same person',
      replyTo: {
        original_tweet_id: '2',
        original_user_id: '2',
        original_username: 'sara',
      },
    },
    {
      id: '5',
      username: 'john',
      name: 'John',
      user_id: '3',
      content: 'A retweeted tweet',
      retweet: {
        user_id: '1',
        original_user_id: '1',
        username: 'jacob',
        created_at: '2017-09-27T09:47:20.776Z',
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

    const jacob = R.find(u => u.id === '1' && !u.partial, action.users);
    expect(jacob.username).toBe('jacob');
    expect(jacob.retweets[0].id).toBe('5');
    console.log(jacob);

    const jacobPartial = R.find(u => u.id === '1' && u.partial, action.users);
    expect(jacobPartial.tweets).toContain('1');
    expect(jacobPartial.tweets).not.toContain('2');
    expect(jacobPartial.tweets).toContain('3');
    expect(jacobPartial.tweets).toContain('4');
    expect(jacobPartial.tweets).not.toContain('5');
    console.log(jacobPartial);

    const sara = R.find(R.propEq('id', '2'), action.users);
    expect(sara.username).toBe('sara');
    expect(sara.tweets).toContain('2');
    expect(sara.partial).toBe(true);

    const john = R.find(R.propEq('id', '3'), action.users);
    expect(john.username).toBe('john');
    expect(john.partial).toBe(true);
    expect(john.tweets).toContain('5');

    expect(action.tweets[0]).not.toHaveProperty('name');
    expect(action.tweets[0]).not.toHaveProperty('username');
    expect(action.tweets[1].replyTo.originalTweetID).toBe('2');
  });
});
