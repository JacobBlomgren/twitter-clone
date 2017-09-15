import 'isomorphic-fetch';

import tweets from '../../../src/client/reducers/entities/tweets';
import {
  likeTweetRequest,
  likeTweetSucess,
  likeTweetFailure,
} from '../../../src/client/actions/like';
import { RECIEVE_PROFILE_SUCCESS } from '../../../src/client/actions/profile';

let state;

beforeEach(() => {
  state = tweets(undefined, {});
});

test('default', () => {
  expect(state).toHaveProperty('byID');
  expect(state).toHaveProperty('allIDs');
});

describe('like tweet', () => {
  test('LIKE_TWEET_REQUEST', () => {
    state = tweets(
      {
        byID: {
          '1': {
            id: '1',
            likeCount: 0,
            liked: false,
          },
        },
        allIDs: ['1'],
      },
      {},
    );
    state = tweets(state, likeTweetRequest('1'));
    expect(state.byID['1'].likeCount).toBe(1);
    expect(state.byID['1'].liked).toBe(true);
  });

  test('LIKE_TWEET_FAILURE', () => {
    state = tweets(
      {
        byID: {
          '1': {
            id: '1',
            likeCount: 1,
            liked: true,
          },
        },
        allIDs: ['1'],
      },
      {},
    );
    state = tweets(state, likeTweetFailure('1'));
    expect(state.byID['1'].likeCount).toBe(0);
    expect(state.byID['1'].liked).toBe(false);
  });
});

describe('recieve profile', () => {
  test('RECIEVE_PROFILE_SUCCESS', () => {
    state = tweets(
      {
        byID: {
          '1': {
            id: '1',
            likeCount: 1,
          },
          '2': {
            id: '2',
          },
        },
        allIDs: ['1', '2'],
      },
      {},
    );

    state = tweets(state, {
      type: RECIEVE_PROFILE_SUCCESS,
      tweets: [
        {
          id: '3',
        },
        {
          id: '1',
          likeCount: 3,
        },
      ],
    });

    expect(state.allIDs).toContain('1');
    expect(state.allIDs).toContain('2');
    expect(state.allIDs).toContain('3');

    expect(state.byID).toHaveProperty('1');
    expect(state.byID).toHaveProperty('2');
    expect(state.byID).toHaveProperty('3');

    expect(state.byID['1'].likeCount).toBe(3);
  });
});
