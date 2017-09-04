import { db } from './connection';

export function resetFollows() {
  return db.none('DELETE FROM follows');
}

export function resetTweets() {
  return db.none('DELETE FROM tweet');
}
