import 'isomorphic-fetch';

import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import {
  search,
  SEARCH_REQUEST,
  SEARCH_USER_FAILURE,
  SEARCH_USER_SUCCESS,
} from '../../../../src/shared/actions/search';

const mockStore = configureMockStore([thunkMiddleware]);

afterEach(() => {
  fetchMock.restore();
});

test('search users success', async () => {
  fetchMock.get('/api/search/users?q=Jacob', {
    body: {
      matches: [{ id: '1', name: 'Jacob Blomgren' }, { id: '2', name: 'Jacob' }],
      query: 'Jacob',
    },
  });
  const store = mockStore();
  const mockCallback = jest.fn();
  await store.dispatch(search(mockCallback, 'Jacob'));
  expect(store.getActions()[0].type).toBe(SEARCH_REQUEST);
  expect(store.getActions()[1].type).toBe(SEARCH_USER_SUCCESS);
  expect(mockCallback.mock.calls[0][0]).toBe('Jacob');
});

test('search users failure', async () => {
  fetchMock.get('/api/search/users?q=Jacob', 500);
  const store = mockStore();
  await store.dispatch(search(() => null, 'Jacob'));
  expect(store.getActions()[0].type).toBe(SEARCH_REQUEST);
  expect(store.getActions()[1].type).toBe(SEARCH_USER_FAILURE);
});
