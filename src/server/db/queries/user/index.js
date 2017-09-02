import { db } from '../../connection';

import getQueryFile from '../../getQueryFile';

const getUserQueryFile = getQueryFile('user/get_user');

export function getUserByID(userID, loggedInUserID) {
  return db.oneOrNone(getUserQueryFile, [userID, loggedInUserID]);
}

/**
 * Gets the authorization info for a user from the database.
 * @param userID
 * @returns {Promise<Object>} user - The user with the id, or null if such a user does not exist.
 * @return {string} user.username
 * @return {number} user.id
 * @return {string} user.hash
 * @return {string} user.salt_rounds
 */
export function getUserByIDAuth(userID) {
  return db.oneOrNone(
    'SELECT username, user_id AS id, hash, salt_rounds FROM account WHERE user_id = $1',
    userID,
  );
}

/**
 * Gets the authorization info for a user from the database.
 * @param username
 * @returns {Promise<Object>} user - The user with the username, or null if such a user does not exist.
 * @return {string} user.username
 * @return {number} user.id
 * @return {string} user.hash
 * @return {string} user.salt_rounds
 */
export function getUserByUsernameAuth(username) {
  return db.oneOrNone(
    'SELECT username, user_id AS id, hash, salt_rounds, created_at FROM account WHERE username = $1',
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
