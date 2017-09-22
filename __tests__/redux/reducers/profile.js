import 'isomorphic-fetch';

import users from '../../../src/client/reducers/entities/users';
import {
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
} from '../../../src/client/actions/follow';
import { FETCH_PROFILE_SUCCESS } from '../../../src/client/actions/profile';

test('default', () => {
  const state = users(undefined, {});
  expect(state.byID).toEqual({});
  expect(state.allIDs).toEqual([]);
});

test('RECIEVE_PROFILE', () => {
  const initialState = users(
    {
      byID: {
        '1': {
          id: '1',
          name: 'Jacob',
        },
      },
      allIDs: ['1'],
    },
    {},
  );
  const state = users(initialState, {
    type: FETCH_PROFILE_SUCCESS,
    user: {
      id: '2',
      name: 'Sara',
    },
  });
  expect(state.allIDs).toContain('1');
  expect(state.allIDs).toContain('2');
  expect(state.byID['2']).toEqual({
    id: '2',
    name: 'Sara',
  });
});

test('RECIEVE_PROFILE merging', () => {
  const initialState = users(
    {
      byID: {
        '1': {
          id: '1',
          name: 'Jacob',
          tweets: ['1', '2'],
        },
      },
      allIDs: ['1'],
    },
    {},
  );
  const state = users(initialState, {
    type: FETCH_PROFILE_SUCCESS,
    user: {
      id: '1',
      name: 'Jacob Blomgren',
      tweets: ['2', '3', '4'],
    },
  });
  expect(state.allIDs).toEqual(['1']);
  expect(state.byID['1']).toEqual({
    id: '1',
    name: 'Jacob Blomgren',
    tweets: ['2', '3', '4'],
  });
});

describe('follow user', () => {
  test('FOLLOW_REQUEST', () => {
    const initialState = users(
      {
        byID: {
          '1': {
            id: '1',
            follows: false,
            followerCount: 5,
          },
        },
        allIDs: ['1'],
      },
      {},
    );
    const state = users(initialState, {
      type: FOLLOW_REQUEST,
      userID: '1',
    });
    expect(state.byID['1'].followerCount).toBe(6);
    expect(state.byID['1'].follows).toBe(true);
  });

  test('FOLLOW_REQUEST multiple times', () => {
    const initialState = users(
      {
        byID: {
          '1': {
            id: '1',
            follows: false,
            followerCount: 0,
          },
        },
        allIDs: ['1'],
      },
      {},
    );
    const state1 = users(initialState, {
      type: FOLLOW_REQUEST,
      userID: '1',
    });
    const state2 = users(state1, {
      type: FOLLOW_REQUEST,
      userID: '1',
    });
    expect(state2.byID['1'].followerCount).toBe(1);
    expect(state2.byID['1'].follows).toBe(true);
  });

  test('FOLLOW_REQUEST non-existent USER', () => {
    const initialState = users(
      {
        byID: {
          '1': {
            id: '1',
            follows: false,
            followerCount: 0,
          },
        },
        allIDs: ['1'],
      },
      {},
    );
    const state = users(initialState, {
      type: FOLLOW_REQUEST,
      userID: '5',
    });
    expect(state).toEqual(initialState);
  });

  test('FOLLOW_FAILURE', () => {
    const initialState = users(
      {
        byID: {
          '1': {
            id: '1',
            follows: false,
            followerCount: 0,
          },
        },
        allIDs: ['1'],
      },
      {},
    );
    const state = users(initialState, {
      type: FOLLOW_FAILURE,
      userID: '1',
    });
    expect(state.byID['1'].followerCount).toBe(0);
    expect(state.byID['1'].follows).toBe(false);
  });
});
