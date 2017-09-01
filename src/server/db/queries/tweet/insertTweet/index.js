import R from 'ramda';

import { db, pgpHelpers } from '../../../connection';
import getQueryFile from '../../../getQueryFile';

async function insertHashtags(transaction, tweetID, hashtags) {
  if (R.isEmpty(hashtags)) return Promise.resolve();
  const hashtagsWithTweetID = hashtags.map(hashtag => ({
    tweet_id: tweetID,
    hashtag,
  }));
  return transaction.none(
    pgpHelpers.insert(
      hashtagsWithTweetID,
      ['tweet_id', 'hashtag'],
      'hashtag_used',
    ),
  );
}

const mentionsQueryFile = getQueryFile('tweet/insertTweet/insert_mentions');

async function insertMentions(transaction, tweetID, mentions) {
  if (R.isEmpty(mentions)) return Promise.resolve();
  const queries = mentions.map(username => ({
    query: mentionsQueryFile,
    values: [tweetID, username],
  }));
  return transaction.none(pgpHelpers.concat(queries));
}

const replyToQueryFile = getQueryFile('tweet/insertTweet/insert_reply_to');

async function insertReplyTo(transaction, tweetID, replyTo) {
  if (!replyTo) return Promise.resolve();
  return transaction.none(replyToQueryFile, [tweetID, replyTo]);
}

export default async function(userID, content, hashtags, mentions, replyTo) {
  return db.tx('insert tweet', async transaction => {
    const insertion = await transaction.one(
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
    await transaction.batch([
      insertHashtags(transaction, tweetID, hashtags),
      insertMentions(transaction, tweetID, mentions),
      insertReplyTo(transaction, tweetID, replyTo),
    ]);
    return tweetID;
  });
}
