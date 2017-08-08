import R from 'ramda';

import { db, pgpHelpers, QueryFile } from '../../connection';

async function insertHashtags(tweetID, hashtags) {
  const hashtagsWithTweetID = hashtags.map(hashtag => ({
    tweet_id: tweetID,
    hashtag,
  }));
  return db.none(
    pgpHelpers.insert(
      hashtagsWithTweetID,
      ['tweet_id', 'hashtag'],
      'hashtag_used',
    ),
  );
}

const mentionsQueryFile = new QueryFile(
  './server/db/queries/tweet/mentions.sql',
  { minify: true },
);

async function insertMentions(tweetID, mentions) {
  const queries = mentions.map(username => ({
    query: mentionsQueryFile,
    values: [tweetID, username],
  }));
  return db.none(pgpHelpers.concat(queries));
}

async function insertReplyTo(tweetID, replyTo) {
  return db.none('INSERT INTO reply_to (reply, original) VALUES ($1, $2)', [
    tweetID,
    replyTo,
  ]);
}

export async function insertTweet(
  userID,
  content,
  hashtags,
  mentions,
  replyTo,
) {
  const insertion = await db.one(
    'INSERT INTO tweet (user_id, content) VALUES ($/userID/, $/content/) RETURNING id',
    {
      userID,
      content,
    },
  );

  const tweetID = insertion.id;
  // These three queries could be concatenated together for performance as suggested here
  // https://github.com/vitaly-t/pg-promise/wiki/Performance-Boost but since this app will never
  // need that kind of performance optimization, it is left like this for clarity.
  if (!R.isEmpty(hashtags)) await insertHashtags(tweetID, hashtags);
  if (!R.isEmpty(mentions)) await insertMentions(tweetID, mentions);
  if (replyTo !== null) insertReplyTo(tweetID, replyTo);
  return tweetID;
}

export function removeTweet(tweetID, userID) {
  return db.oneOrNone(
    'DELETE FROM tweet WHERE id = $/tweetID/ AND user_ID = $/userID/ RETURNING *',
    {
      tweetID,
      userID,
    },
  );
}
