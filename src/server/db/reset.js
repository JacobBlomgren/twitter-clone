import db from './connection';

export function resetAccount() {
  return db.none('DELETE FROM account');
}

export function resetFollows() {
  return db.none('DELETE FROM follows');
}

export async function reset() {
  await resetFollows();
  return resetAccount();
}
