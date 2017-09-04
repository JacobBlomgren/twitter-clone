import { db } from '../../../connection';

export default function(tweetID, userID) {
  return db.none('INSERT INTO retweet (tweet_id, user_id) VALUES ($1, $2)', [
    tweetID,
    userID,
  ]);
}
