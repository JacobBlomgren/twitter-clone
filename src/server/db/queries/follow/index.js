import { db } from '../../connection';
import getQueryFile from '../../getQueryFile';

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

const getFollowersQueryFile = getQueryFile('follow/get_following');

export function getFollowing(userID) {
  return db.any(getFollowersQueryFile, userID);
}
