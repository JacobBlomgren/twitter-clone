import 'isomorphic-fetch';
import deepFreeze from 'deep-freeze';

import tweets from '../../../../src/shared/reducers/entities/tweets';
import {
  LIKE_TWEET_FAILURE,
  LIKE_TWEET_REQUEST,
  UNLIKE_TWEET_FAILURE,
  UNLIKE_TWEET_REQUEST,
} from '../../../../src/shared/actions/like';
import { FETCH_PROFILE_SUCCESS } from '../../../../src/shared/actions/profile';
import {
  REMOVE_RETWEET_FAILURE,
  REMOVE_RETWEET_REQUEST,
  RETWEET_FAILURE,
  RETWEET_REQUEST,
} from '../../../../src/shared/actions/retweet';
import {
  FETCH_TWEET_NOT_FOUND,
  FETCH_TWEET_SUCCESS,
  POST_TWEET_SUCCESS,
} from '../../../../src/shared/actions/tweet';
import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from '../../../../src/shared/actions/auth';
import { FETCH_TIMELINE_SUCCESS } from '../../../../src/shared/actions/timeline';

test('default', () => {
  const state = tweets(undefined, {});
  expect(state.byID).toEqual({});
  expect(state.allIDs).toEqual([]);
});

describe('like tweet', () => {
  test('LIKE_TWEET_REQUEST', () => {
    const initialState = tweets(
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
    deepFreeze(initialState);
    const state = tweets(initialState, {
      type: LIKE_TWEET_REQUEST,
      tweetID: '1',
    });
    expect(state.byID['1'].likeCount).toBe(1);
    expect(state.byID['1'].liked).toBe(true);
  });

  test('LIKE_TWEET_REQUEST multiple times', () => {
    // Should only add one like

    const initialState = tweets(
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
    deepFreeze(initialState);
    const state1 = tweets(initialState, {
      type: LIKE_TWEET_REQUEST,
      tweetID: '1',
    });
    const state2 = tweets(state1, {
      type: LIKE_TWEET_REQUEST,
      tweetID: '1',
    });
    expect(state2.byID['1'].likeCount).toBe(1);
    expect(state2.byID['1'].liked).toBe(true);
  });

  test('LIKE_TWEET_REQUEST non-existent tweet', () => {
    const initialState = tweets(
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
    deepFreeze(initialState);
    const state = tweets(initialState, {
      type: LIKE_TWEET_REQUEST,
      tweetID: '5',
    });
    expect(state).toEqual(initialState);
  });

  test('LIKE_TWEET_FAILURE', () => {
    const initialState = tweets(
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
    deepFreeze(initialState);
    const state = tweets(initialState, {
      type: LIKE_TWEET_FAILURE,
      tweetID: '1',
    });
    expect(state.byID['1'].likeCount).toBe(0);
    expect(state.byID['1'].liked).toBe(false);
  });
});

describe('unlike tweet', () => {
  test('UNLIKE_TWEET_REQUEST', () => {
    const initialState = tweets(
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
    deepFreeze(initialState);
    const state = tweets(initialState, {
      type: UNLIKE_TWEET_REQUEST,
      tweetID: '1',
    });
    expect(state.byID['1'].likeCount).toBe(0);
    expect(state.byID['1'].liked).toBe(false);
  });

  test('UNLIKE_TWEET_FAILURE', () => {
    const initialState = tweets(
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
    deepFreeze(initialState);
    const state = tweets(initialState, {
      type: UNLIKE_TWEET_FAILURE,
      tweetID: '1',
    });
    expect(state.byID['1'].likeCount).toBe(1);
    expect(state.byID['1'].liked).toBe(true);
  });
});

describe('recieve profile', () => {
  test('FETCH_PROFILE_SUCCESS', () => {
    const initialState = tweets(
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
    deepFreeze(initialState);

    const state = tweets(initialState, {
      type: FETCH_PROFILE_SUCCESS,
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

    expect(state.allIDs).toEqual(expect.arrayContaining(['1', '2', '3']));

    expect(state.byID).toEqual(
      expect.objectContaining({
        '1': expect.any(Object),
        '2': expect.any(Object),
        '3': expect.any(Object),
      }),
    );

    expect(state.byID['1'].likeCount).toBe(3);
  });
});

describe('recieve detailed tweet', () => {
  test('FETCH_TWEET_SUCCESS', () => {
    const initialState = tweets(
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
    deepFreeze(initialState);

    const state = tweets(initialState, {
      type: FETCH_TWEET_SUCCESS,
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

    expect(state.allIDs).toEqual(expect.arrayContaining(['1', '2', '3']));

    expect(state.byID).toEqual(
      expect.objectContaining({
        '1': expect.any(Object),
        '2': expect.any(Object),
        '3': expect.any(Object),
      }),
    );

    expect(state.byID['1'].likeCount).toBe(3);
  });

  test('remove not found tweets that are now recieved', () => {
    const initialState = {
      notFound: {
        '3': {
          id: '3',
          time: Date.now(),
        },
        '2': {
          id: '2',
          time: Date.now(),
        },
      },
    };
    deepFreeze(initialState);
    const state = tweets(initialState, {
      type: FETCH_TWEET_SUCCESS,
      tweets: [
        {
          id: '3',
        },
      ],
    });

    expect(state.notFound['3']).toBeUndefined();
    expect(state.notFound['2']).toBeDefined();
  });
});

describe('retweet', () => {
  test('RETWEET_REQUEST', () => {
    const initialState = tweets(
      {
        byID: {
          '1': {
            id: '1',
            retweetCount: 0,
            retweeted: false,
          },
        },
        allIDs: ['1'],
      },
      {},
    );
    deepFreeze(initialState);
    const state = tweets(initialState, {
      type: RETWEET_REQUEST,
      tweetID: '1',
    });
    expect(state.byID['1'].retweetCount).toBe(1);
    expect(state.byID['1'].retweeted).toBe(true);
  });

  test('RETWEET_REQUEST multiple times', () => {
    const initialState = tweets(
      {
        byID: {
          '1': {
            id: '1',
            retweetCount: 0,
            retweeted: false,
          },
        },
        allIDs: ['1'],
      },
      {},
    );
    deepFreeze(initialState);
    const state1 = tweets(initialState, {
      type: RETWEET_REQUEST,
      tweetID: '1',
    });
    deepFreeze(state1);
    const state2 = tweets(state1, {
      type: RETWEET_REQUEST,
      tweetID: '1',
    });
    expect(state2.byID['1'].retweetCount).toBe(1);
    expect(state2.byID['1'].retweeted).toBe(true);
  });

  test('RETWEET_REQUEST non-existent tweet', () => {
    const initialState = tweets(
      {
        byID: {
          '1': {
            id: '1',
            retweetCount: 0,
            retweeted: false,
          },
        },
        allIDs: ['1'],
      },
      {},
    );
    deepFreeze(initialState);
    const state = tweets(initialState, {
      type: LIKE_TWEET_REQUEST,
      tweetID: '5',
    });
    expect(state).toEqual(initialState);
  });

  test('RETWEET_FAILURE', () => {
    const initialState = tweets(
      {
        byID: {
          '1': {
            id: '1',
            retweetCount: 1,
            retweeted: true,
          },
        },
        allIDs: ['1'],
      },
      {},
    );
    deepFreeze(initialState);
    const state = tweets(initialState, {
      type: RETWEET_FAILURE,
      tweetID: '1',
    });
    expect(state.byID['1'].retweetCount).toBe(0);
    expect(state.byID['1'].retweeted).toBe(false);
  });
});

describe('remove retweet of tweet', () => {
  test('REMOVE_RETWEET_REQUEST', () => {
    const initialState = tweets(
      {
        byID: {
          '1': {
            id: '1',
            retweetCount: 1,
            retweeted: true,
          },
        },
        allIDs: ['1'],
      },
      {},
    );
    deepFreeze(initialState);
    const state = tweets(initialState, {
      type: REMOVE_RETWEET_REQUEST,
      tweetID: '1',
    });
    expect(state.byID['1'].retweetCount).toBe(0);
    expect(state.byID['1'].retweeted).toBe(false);
  });

  test('REMOVE_RETWEET_FAILURE', () => {
    const initialState = tweets(
      {
        byID: {
          '1': {
            id: '1',
            retweetCount: 0,
            retweeted: false,
          },
        },
        allIDs: ['1'],
      },
      {},
    );
    deepFreeze(initialState);
    const state = tweets(initialState, {
      type: REMOVE_RETWEET_FAILURE,
      tweetID: '1',
    });
    expect(state.byID['1'].retweetCount).toBe(1);
    expect(state.byID['1'].retweeted).toBe(true);
  });
});

describe('post tweet', () => {
  test('POST_TWEET_SUCCESS', () => {
    const state = tweets(undefined, {
      type: POST_TWEET_SUCCESS,
      tweets: [
        {
          id: '1',
          content: 'a tweet',
        },
      ],
    });

    expect(state.byID).toEqual({
      '1': {
        id: '1',
        content: 'a tweet',
      },
    });
    expect(state.allIDs).toEqual(['1']);
  });
});

describe('recieve profile', () => {
  test('FETCH_PROFILE_SUCCESS', () => {
    const initialState = tweets(
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
    deepFreeze(initialState);

    const state = tweets(initialState, {
      type: FETCH_PROFILE_SUCCESS,
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

    expect(state.allIDs).toEqual(expect.arrayContaining(['1', '2', '3']));

    expect(state.byID).toEqual(
      expect.objectContaining({
        '1': expect.any(Object),
        '2': expect.any(Object),
        '3': expect.any(Object),
      }),
    );

    expect(state.byID['1'].likeCount).toBe(3);
  });
});

test('tweet not found', () => {
  const time = Date.now();
  const state = tweets(undefined, {
    type: FETCH_TWEET_NOT_FOUND,
    id: '1',
    time,
  });
  expect(state.notFound['1']).toEqual({
    id: '1',
    time,
  });
});

test('invalidate data on login', () => {
  const initialState = tweets(
    {
      byID: {
        '1': {
          id: '1',
          liked: false,
          retweeted: false,
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

  const state = tweets(initialState, { type: LOGIN_SUCCESS });
  const tweet1 = state.byID['1'];
  expect(tweet1).toHaveProperty('liked');
  expect(tweet1).toHaveProperty('retweeted');
  expect(tweet1).toHaveProperty('partial', true);

  expect(state.byID['2']).toHaveProperty('partial', true);
});

test('timeline', () => {
  const initialState = tweets(
    {
      timeline: ['1'],
    },
    {},
  );
  deepFreeze(initialState);

  const state = tweets(initialState, {
    type: FETCH_TIMELINE_SUCCESS,
    tweets: [
      {
        id: '1',
        content: 'tweet',
      },
      {
        id: '2',
        content: 'second tweet',
      },
    ],
  });
  expect(state.timeline).toEqual(['1', '2']);
});

test('logging out should remove likes and retweets', () => {
  const { byID } = tweets(
    {
      byID: {
        '1': {
          id: '1',
          liked: true,
          retweeted: false,
        },
        '2': {
          id: '2',
          liked: false,
          retweeted: true,
        },
      },
    },
    { type: LOGOUT_SUCCESS },
  );

  expect(byID).toEqual({
    '1': {
      id: '1',
      liked: false,
      retweeted: false,
    },
    '2': {
      id: '2',
      liked: false,
      retweeted: false,
    },
  });
});
