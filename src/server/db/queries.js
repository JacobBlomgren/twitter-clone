import db from './connection';

/**
 * Gets a user from the database
 * @param id
 * @returns {Promise<Object>} user - The user with the id, or null if such a user does not exist.
 * @return {string} user.username
 * @return {number} user.id
 * @return {string} user.hash
 * @return {string} user.salt_rounds
 */
export function getUserByID(id) {
  return db.oneOrNone(
    'SELECT username, id, hash, salt_rounds FROM account WHERE id = $1',
    id,
  );
}

/**
 * Gets a user from the database.
 * @param username
 * @returns {Promise<Object>} user - The user with the username, or null if such a user does not exist.
 * @return {string} user.username
 * @return {number} user.id
 * @return {string} user.hash
 * @return {string} user.salt_rounds
 */
export function getUserByUsername(username) {
  return db.oneOrNone(
    'SELECT username, id, hash, salt_rounds FROM account WHERE username = $1',
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

export function follow(follower, followee) {
  return db.none('INSERT INTO follows (follower, followee) VALUES ($1, $2)', [
    follower,
    followee,
  ]);
}

export function unfollow(follower, followee) {
  return db.none('DELETE FROM follows WHERE follower = $1 and followee = $2', [
    follower,
    followee,
  ]);
}
