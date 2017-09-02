import { db } from '../../connection';

export function addLike(tweetID, userID) {
  return db.none('INSERT INTO likes (tweet_id, user_id) VALUES ($1, $2)', [
    tweetID,
    userID,
  ]);
}

export function removeLike(tweetID, userID) {
  return db.none('DELETE FROM likes WHERE tweet_id = $1 and user_id = $2', [
    tweetID,
    userID,
  ]);
}
