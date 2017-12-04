import 'isomorphic-fetch';

import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import {
  fetchProfile,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_NOT_FOUND,
} from '../../../../src/shared/actions/profile';

const mockStore = configureMockStore([thunkMiddleware]);

afterEach(() => {
  fetchMock.restore();
});

test('fetch user sucess', async () => {
  fetchMock.get('/api/user?username=jacob', {
    body: {
      id: '1',
      name: 'Jacob Blomgren',
      username: 'jacobblomgren',
      description: "I'm a programmer from Stockholm.",
      tweets: [
        {
          id: '1',
          username: 'jacobblomgren',
          name: 'Jacob Blomgren',
          user_id: '1',
          content: 'a tweet',
        },
      ],
    },
  });
  const store = mockStore();
  await store.dispatch(fetchProfile('jacob'));

  expect(store.getActions()[0].type).toBe(FETCH_PROFILE_REQUEST);
  expect(store.getActions()[1].type).toBe(FETCH_PROFILE_SUCCESS);
});

test('fetch user not found', async () => {
  fetchMock.get('/api/user?username=jacob', 404);
  const store = mockStore();
  await store.dispatch(fetchProfile('jacob'));

  expect(store.getActions()[0].type).toBe(FETCH_PROFILE_REQUEST);
  expect(store.getActions()[1].type).toBe(FETCH_PROFILE_NOT_FOUND);
});
