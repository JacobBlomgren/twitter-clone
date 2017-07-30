import db from './connection';

export function getUserByID(id) {
  return db.one(
    'SELECT username, user_id AS id FROM account WHERE user_id = $1',
    id,
  );
}

export function getUserByUsername(username) {
  return db.one('SELECT * FROM account WHERE username = $1', username);
}

export function insertUser(username, hash) {
  return db.none(
    'INSERT INTO account (username, hash) VALUES ($/username/, $/hash/) ',
    {
      username,
      hash,
    },
  );
}
