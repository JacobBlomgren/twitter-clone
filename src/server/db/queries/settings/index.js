import { db } from '../../connection';

export function updateName(userID, name) {
  return db.none('UPDATE account SET name = $1 WHERE user_id = $2', [
    name,
    userID,
  ]);
}

export function updateDescription(userID, description) {
  return db.none('UPDATE account SET description = $1 WHERE user_id = $2', [
    description,
    userID,
  ]);
}
