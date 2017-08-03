import { db } from '../../connection';

export function insertTweet(userID, content) {
  return db.none(
    'INSERT INTO tweet (user_id, content) VALUES ($/userID/, $/content/)',
    {
      userID,
      content,
    },
  );
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
