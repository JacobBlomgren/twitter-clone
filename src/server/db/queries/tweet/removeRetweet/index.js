import { db } from '../../../connection';

export default function(tweetID, userID) {
  return db.none('DELETE FROM retweet WHERE tweet_id = $1 AND user_id = $2', [
    tweetID,
    userID,
  ]);
}
