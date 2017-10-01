import R from 'ramda';

import {
  normalizeProfileToUser,
  normalizeTweets,
} from '../../src/shared/actions/normalization';

describe('normalizeTweets', () => {
  test('normal tweets', () => {
    const { users, tweets } = normalizeTweets([
      {
        id: '1',
        username: 'jacobblomgren',
        name: 'Jacob Blomgren',
        userID: '1',
        content: 'a tweet',
      },
      {
        id: '2',
        username: 'jacobblomgren',
        name: 'Jacob Blomgren',
        userID: '1',
        content: 'a second tweet',
      },
    ]);

    expect(users[0]).toEqual({
      id: '1',
      username: 'jacobblomgren',
      name: 'Jacob Blomgren',
      tweets: ['1', '2'],
      partial: true,
    });
    expect(tweets).toContainEqual({
      id: '1',
      userID: '1',
      content: 'a tweet',
    });
    expect(tweets).toContainEqual({
      id: '2',
      userID: '1',
      content: 'a second tweet',
    });
  });

  test('tweets from several users', () => {
    const { users } = normalizeTweets([
      {
        id: '1',
        username: 'jacobblomgren',
        name: 'Jacob Blomgren',
        userID: '1',
        content: 'a tweet',
      },
      {
        id: '2',
        username: 'sara',
        name: 'Sara',
        userID: '2',
        content: 'a second tweet',
      },
    ]);

    expect(users).toContainEqual({
      id: '1',
      username: 'jacobblomgren',
      name: 'Jacob Blomgren',
      tweets: ['1'],
      partial: true,
    });
    expect(users).toContainEqual({
      id: '2',
      username: 'sara',
      name: 'Sara',
      tweets: ['2'],
      partial: true,
    });
  });

  test('extract replyTo data', () => {
    const { users, tweets, replies } = normalizeTweets([
      {
        id: '2',
        username: 'jacobblomgren',
        name: 'Jacob Blomgren',
        userID: '1',
        content: 'a reply',
        replyTo: {
          originalTweetID: '1',
          originalUserID: '2',
          originalUsername: 'sara',
        },
      },
      {
        id: '3',
        username: 'jacobblomgren',
        name: 'Jacob Blomgren',
        userID: '1',
        content: 'a second reply',
        replyTo: {
          originalTweetID: '1',
          originalUserID: '2',
          originalUsername: 'sara',
        },
      },
      {
        id: '4',
        username: 'sara',
        name: 'Sara Eriksson',
        userID: '2',
        content: 'reply back',
        replyTo: {
          originalTweetID: '2',
          originalUserID: '1',
          originalUsername: 'jacob',
        },
      },
    ]);

    expect(
      R.any(
        u => u.username === 'sara' && u.partial && u.tweets.includes('1'),
        users,
      ),
    ).toBe(true);
    expect(tweets).toContainEqual({ id: '1', userID: '2' });
    expect(replies['1']).toContain('2');
    expect(replies['1']).toContain('3');
    expect(replies['1']).not.toContain('4');
  });

  test('null properties', () => {
    const { users } = normalizeTweets([
      {
        id: '1',
        username: 'jacobblomgren',
        name: 'Jacob Blomgren',
        userID: '1',
        content: 'a tweet',
        replyTo: null,
        retweet: null,
      },
    ]);

    expect(users).toContainEqual({
      id: '1',
      username: 'jacobblomgren',
      name: 'Jacob Blomgren',
      tweets: ['1'],
      partial: true,
    });
  });

  test('empty argument', () => {
    const { users, tweets, replies } = normalizeTweets([]);
    expect(users).toEqual([]);
    expect(tweets).toEqual([]);
    expect(replies).toEqual({});
  });
});

test('normalizeProfileToUser', () => {
  const user = normalizeProfileToUser({
    id: '1',
    name: 'Jacob Blomgren',
    username: 'jacobblomgren',
    description: "I'm a programmer from Stockholm.",
    tweets: [
      {
        id: '1',
        username: 'sara',
        name: 'Sara',
        userID: '2',
        content: 'A retweeted tweet',
        retweet: {
          userID: '1',
          username: 'jacob',
          name: 'Jacob Blomgren',
          createdAt: '2017-09-30T09:47:20.776Z',
        },
      },
    ],
  });

  expect(user.id).toBe('1');
  expect(user.name).toBe('Jacob Blomgren');
  expect(user.username).toBe('jacobblomgren');
  expect(user.description).toBe("I'm a programmer from Stockholm.");
  expect(user.partial).toBe(false);
  expect(user.retweets).toEqual([
    { id: '1', createdAt: '2017-09-30T09:47:20.776Z' },
  ]);
});