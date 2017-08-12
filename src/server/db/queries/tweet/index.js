import R from 'ramda';

import { db, pgpHelpers } from '../../connection';
import getQueryFile from '../../getQueryFile';

async function insertHashtags(tweetID, hashtags, task) {
  if (R.isEmpty(hashtags)) return Promise.resolve();
  const hashtagsWithTweetID = hashtags.map(hashtag => ({
    tweet_id: tweetID,
    hashtag,
  }));
  return task.none(
    pgpHelpers.insert(
      hashtagsWithTweetID,
      ['tweet_id', 'hashtag'],
      'hashtag_used',
    ),
  );
}

const mentionsQueryFile = getQueryFile('tweet/mentions');

async function insertMentions(tweetID, mentions, task) {
  if (R.isEmpty(mentions)) return Promise.resolve();
  const queries = mentions.map(username => ({
    query: mentionsQueryFile,
    values: [tweetID, username],
  }));
  return task.none(pgpHelpers.concat(queries));
}

const replyToQueryFile = getQueryFile('tweet/reply_to');

async function insertReplyTo(tweetID, replyTo, task) {
  if (replyTo === null) return Promise.resolve();
  return task.none(replyToQueryFile, [tweetID, replyTo]);
}

export async function insertTweet(
  userID,
  content,
  hashtags,
  mentions,
  replyTo,
) {
  // Use a task to share the database connection
  // See https://github.com/vitaly-t/pg-promise/wiki/chaining-queries
  return db.task('insert tweet', async task => {
    const insertion = await task.one(
      'INSERT INTO tweet (user_id, content) VALUES ($/userID/, $/content/) RETURNING tweet_id',
      {
        userID,
        content,
      },
    );
    const tweetID = insertion.tweet_id;

    // These three queries could be concatenated together so that they do not make
    // three separate database requests, as suggested here
    // https://github.com/vitaly-t/pg-promise/wiki/Performance-Boost
    // But since this app will never need that kind of performance optimization,
    // it is left like this for clarity.
    await Promise.all([
      insertHashtags(tweetID, hashtags, task),
      insertMentions(tweetID, mentions, task),
      insertReplyTo(tweetID, replyTo, task),
    ]);
    return tweetID;
  });
}

export async function removeTweet(tweetID, userID) {
  return db.oneOrNone(
    'DELETE FROM tweet WHERE tweet_id = $/tweetID/ AND user_ID = $/userID/ RETURNING *',
    {
      tweetID,
      userID,
    },
  );
}

const getTweetQueryFile = getQueryFile('tweet/get_tweet');
const getHashtagsQueryFile = getQueryFile('tweet/get_hashtags');
const getMentionsQueryFile = getQueryFile('tweet/get_mentions');
const getReplyToQueryFile = getQueryFile('tweet/get_reply_to');

async function getTweetWithTask(tweetID, task) {
  const tweet = await task.oneOrNone(getTweetQueryFile, tweetID);
  if (tweet === null) return Promise.resolve(null);
  const [replyTo, hashtags, mentions] = await Promise.all([
    task.oneOrNone(getReplyToQueryFile, tweetID),
    task.manyOrNone(getHashtagsQueryFile, tweetID),
    task.manyOrNone(getMentionsQueryFile, tweetID),
  ]);
  return {
    ...tweet,
    reply_to: replyTo,
    hashtags,
    mentions,
  };
}

export async function getTweet(tweetID) {
  return db.task('get tweet', async task => getTweetWithTask(tweetID, task));
}
