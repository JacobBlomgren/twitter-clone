import { db } from '../../connection';

export function follow(follower, followee) {
  return db.none('INSERT INTO follows (follower, followee) VALUES ($1, $2)', [
    follower,
    followee,
  ]);
}

export function unfollow(follower, followee) {
  return db.oneOrNone(
    'DELETE FROM follows WHERE follower = $1 and followee = $2 RETURNING *',
    [follower, followee],
  );
}
