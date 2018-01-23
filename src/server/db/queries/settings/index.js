import { db, pgpHelpers } from '../../connection';

function updateName(userID, name) {
  return {
    query: 'UPDATE account SET name = $1 WHERE user_id = $2',
    values: [name, userID],
  };
}

function updateDescription(userID, description) {
  return {
    query: 'UPDATE account SET description = $1 WHERE user_id = $2',
    values: [description, userID],
  };
}

export default function updateSettings(userID, { name, description }) {
  const queries = [];
  if (description) queries.push(updateDescription(userID, description));
  if (name) queries.push(updateName(userID, name));
  return db.none(pgpHelpers.concat(queries));
}
