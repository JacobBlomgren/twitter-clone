import { db, pgpHelpers } from './connection';

export function resetAccount() {
  return db.none('DELETE FROM account');
}

export function resetFollows() {
  return db.none('DELETE FROM follows');
}

export function resetTweets() {
  return db.none('DELETE FROM tweet');
}

export async function reset() {
  return db.none(
    pgpHelpers.concat([
      'DELETE FROM follows',
      'DELETE FROM tweet',
      'DELETE FROM account',
    ]),
  );
}
