import { db } from '../../../connection';

export default function(tweetID, userID) {
  return db.oneOrNone(
    'DELETE FROM retweet WHERE tweet_id = $1 AND user_id = $2 RETURNING *',
    [tweetID, userID],
  );
}
