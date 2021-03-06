import 'isomorphic-fetch';
import deepFreeze from 'deep-freeze';

import users from '../../../../src/shared/reducers/entities/users';
import {
  FETCH_FOLLOWING_SUCCESS,
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
} from '../../../../src/shared/actions/following';
import {
  FETCH_PROFILE_NOT_FOUND,
  FETCH_PROFILE_SUCCESS,
} from '../../../../src/shared/actions/profile';
import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from '../../../../src/shared/actions/auth';

test('default', () => {
  const state = users(undefined, {});
  expect(state.byID).toEqual({});
  expect(state.allIDs).toEqual([]);
});

describe('recieve profile', () => {
  test('new information', () => {
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
    deepFreeze(initialState);
    const state = users(initialState, {
      type: FETCH_PROFILE_SUCCESS,
      users: [
        {
          id: '2',
          name: 'Sara',
        },
      ],
    });
    expect(state.allIDs).toContain('1');
    expect(state.allIDs).toContain('2');
    expect(state.byID['2']).toEqual({
      id: '2',
      name: 'Sara',
    });
  });

  test('merging with existent data', () => {
    const initialState = users(
      {
        byID: {
          '1': {
            id: '1',
            name: 'Jacob',
            description: 'Im a programmer',
            tweets: ['1', '3', '5'],
          },
        },
        allIDs: ['1'],
      },
      {},
    );
    deepFreeze(initialState);
    const state = users(initialState, {
      type: FETCH_PROFILE_SUCCESS,
      users: [
        {
          id: '1',
          name: 'Jacob Blomgren',
          tweets: ['2', '4', '5'],
        },
      ],
    });
    expect(state.allIDs).toEqual(['1']);
    expect(state.byID['1'].id).toEqual('1');
    expect(state.byID['1'].name).toEqual('Jacob Blomgren');
    expect(state.byID['1'].description).toEqual('Im a programmer');
    // 🖖🖖🖖🖖🖖
    ['1', '2', '3', '4', '5'].forEach(expect(state.byID['1'].tweets).toContain);
  });

  test('merging duplicate data', () => {
    const initialState = users(
      {
        byID: {
          '1': {
            id: '1',
            name: 'Jacob Blomgren',
            tweets: ['1'],
          },
        },
        allIDs: ['1'],
      },
      {},
    );
    deepFreeze(initialState);
    const state = users(initialState, {
      type: FETCH_PROFILE_SUCCESS,
      users: [
        {
          id: '1',
          name: 'Jacob Blomgren',
          tweets: ['1', '2'],
        },
        {
          id: '1',
          name: 'Jacob Blomgren',
          tweets: ['1', '2', '3'],
        },
      ],
    });
    ['1', '2', '3'].forEach(expect(state.byID['1'].tweets).toContain);
  });

  test('merge partial data when full already exists', () => {
    const initialState = users(
      {
        byID: {
          '1': {
            id: '1',
            name: 'Jacob Blomgren',
            description: 'Im a programmer',
            tweets: ['1'],
            partial: false,
          },
        },
        allIDs: ['1'],
      },
      {},
    );
    deepFreeze(initialState);
    const state = users(initialState, {
      type: FETCH_PROFILE_SUCCESS,
      users: [
        {
          id: '1',
          name: 'Jacob Blomgren',
          tweets: ['1', '2'],
          partial: true,
        },
      ],
    });
    expect(state.byID['1'].partial).toBe(false);
    ['1', '2'].forEach(expect(state.byID['1'].tweets).toContain);
  });

  test('remove notFound users that are now recieved', () => {
    const initialState = {
      notFound: {
        jacob: {
          username: 'jacob',
          time: Date.now(),
        },
        sara: {
          username: 'sara',
          time: Date.now(),
        },
      },
    };
    deepFreeze(initialState);
    const state = users(initialState, {
      type: FETCH_PROFILE_SUCCESS,
      users: [
        {
          id: '1',
          name: 'Jacob Blomgren',
          username: 'jacob',
          description: 'Im a programmer',
        },
      ],
    });
    expect(state.notFound.jacob).toBeUndefined();
    expect(state.notFound.sara).toBeDefined();
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
    deepFreeze(initialState);
    const state = users(initialState, {
      type: FOLLOW_REQUEST,
      userID: '1',
    });
    expect(state.byID['1'].followerCount).toBe(6);
    expect(state.allIDs).toContain('1');
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
    deepFreeze(initialState);
    const state1 = users(initialState, {
      type: FOLLOW_REQUEST,
      userID: '1',
    });
    const state2 = users(state1, {
      type: FOLLOW_REQUEST,
      userID: '1',
    });
    expect(state2.byID['1'].followerCount).toBe(1);
    expect(state2.allIDs).toContain('1');
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
    deepFreeze(initialState);
    const state = users(initialState, {
      type: FOLLOW_REQUEST,
      userID: '5',
    });
    expect(state).toEqual(initialState);
    expect(state.allIDs).not.toContain('5');
  });

  test('FOLLOW_FAILURE', () => {
    const initialState = users(
      {
        byID: {
          '1': {
            id: '1',
            follows: true,
            followerCount: 1,
          },
        },
        allIDs: ['1'],
      },
      {},
    );
    deepFreeze(initialState);
    const state = users(initialState, {
      type: FOLLOW_FAILURE,
      userID: '1',
    });
    expect(state.byID['1'].followerCount).toBe(0);
    expect(state.byID['1'].follows).toBe(false);
  });

  test('UNFOLLOW_REQUEST', () => {
    const initialState = users(
      {
        byID: {
          '1': {
            id: '1',
            follows: true,
            followerCount: 5,
          },
        },
        allIDs: ['1'],
      },
      {},
    );
    deepFreeze(initialState);
    const state = users(initialState, {
      type: UNFOLLOW_REQUEST,
      userID: '1',
    });
    expect(state.byID['1'].followerCount).toBe(4);
    expect(state.byID['1'].follows).toBe(false);
  });

  test('UNFOLLOW_FAILURE', () => {
    const initialState = users(
      {
        byID: {
          '1': {
            id: '1',
            follows: true,
            followerCount: 1,
          },
        },
        allIDs: ['1'],
      },
      {},
    );
    deepFreeze(initialState);
    const state = users(initialState, {
      type: UNFOLLOW_FAILURE,
      userID: '1',
    });
    expect(state.byID['1'].followerCount).toBe(1);
    expect(state.byID['1'].follows).toBe(true);
  });
});

test('user not found', () => {
  const time = Date.now();
  const state = users(undefined, {
    type: FETCH_PROFILE_NOT_FOUND,
    username: 'jacob',
    time,
  });
  expect(state.notFound.jacob).toEqual({
    username: 'jacob',
    time,
  });
});

test('invalidate data on login', () => {
  const initialState = users(
    {
      byID: {
        '1': {
          id: '1',
          follows: false,
        },
        '2': {
          id: '2',
          partial: false,
        },
      },
    },
    {},
  );
  deepFreeze(initialState);

  const state = users(initialState, { type: LOGIN_SUCCESS });
  expect(state.byID['1']).toHaveProperty('follows');
  expect(state.byID['1']).toHaveProperty('partial', true);
  expect(state.byID['2']).toHaveProperty('partial', true);
});

test('fetch following', async () => {
  const state = users(undefined, {
    type: FETCH_FOLLOWING_SUCCESS,
    users: [
      {
        id: '1',
        follows: true,
        name: 'jacob',
      },
      {
        id: '2',
        follows: true,
        name: 'jake',
      },
    ],
  });
  expect(state.byID).toEqual({
    '1': {
      id: '1',
      follows: true,
      name: 'jacob',
    },
    '2': {
      id: '2',
      follows: true,
      name: 'jake',
    },
  });
});

test('logging out should remove follows data', () => {
  const { byID } = users(
    {
      byID: {
        '1': {
          id: '1',
          follows: true,
          name: 'jacob',
        },
        '2': {
          id: '2',
          follows: false,
          name: 'jake',
        },
      },
    },
    {
      type: LOGOUT_SUCCESS,
    },
  );
  expect(byID).toEqual({
    '1': {
      id: '1',
      follows: false,
      name: 'jacob',
    },
    '2': {
      id: '2',
      follows: false,
      name: 'jake',
    },
  });
});
