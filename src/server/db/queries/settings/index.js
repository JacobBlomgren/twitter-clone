import { db } from '../../connection';

export function updateName(task, userID, name) {
  return task.none('UPDATE account SET name = $1 WHERE user_id = $2', [
    name,
    userID,
  ]);
}

export function updateDescription(task, userID, description) {
  return task.none('UPDATE account SET description = $1 WHERE user_id = $2', [
    description,
    userID,
  ]);
}
