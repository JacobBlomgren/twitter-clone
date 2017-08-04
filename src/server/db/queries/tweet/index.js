import R from 'ramda';

import { db, pgpHelpers } from '../../connection';

export async function insertTweet(userID, content, hashtags, mentions) {
  const insertion = await db.one(
    'INSERT INTO tweet (user_id, content) VALUES ($/userID/, $/content/) RETURNING id',
    {
      userID,
      content,
    },
  );

  const tweetID = insertion.id;

  if (R.isEmpty(hashtags)) return tweetID;

  const hashtagsWithTweetID = hashtags.map(hashtag => ({
    tweet_id: tweetID,
    hashtag,
  }));
  const hashtagQuery = pgpHelpers.insert(
    hashtagsWithTweetID,
    ['tweet_id', 'hashtag'],
    'hashtag_used',
  );

  const mentionsWithTweetID = mentions.map(username => ({
    tweet_id: tweetID,
    username,
  }));
  const mentionQuery = pgpHelpers.insert(
    mentionsWithTweetID,
    ['tweet_id', 'username'],
    'mentions',
  );

  const query = pgpHelpers.concat([hashtagQuery, mentionQuery]);
  await db.none(query);
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
