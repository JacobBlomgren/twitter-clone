import db from './connection';

export function getUserByID(id) {
  return db.oneOrNone(
    'SELECT username, user_id AS id, hash, salt_rounds FROM account WHERE user_id = $1',
    id,
  );
}

export function getUserByUsername(username) {
  return db.oneOrNone(
    'SELECT username, user_id AS id, hash, salt_rounds FROM account WHERE username = $1',
    username,
  );
}

export function insertUser(username, hash, saltRounds) {
  return db.none(
    'INSERT INTO account (username, hash, salt_rounds) VALUES ($/username/, $/hash/, $/saltRounds/) ',
    {
      username,
      hash,
      saltRounds,
    },
  );
}
