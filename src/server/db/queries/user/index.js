import { db } from '../../connection';

import getQueryFile from '../../getQueryFile';
import getTweetsFromUser from '../tweet/getTweet/getTweetsFromUser';

const getUserQueryFile = getQueryFile('user/get_user');

async function getUserQuery(userID, username, loggedInUserID) {
  const user = await db.oneOrNone(getUserQueryFile, [
    userID,
    username,
    loggedInUserID,
  ]);
  if (!user) return null;
  return {
    ...user,
    follower_count: parseInt(user.follower_count, 10),
    following_count: parseInt(user.following_count, 10),
  };
}

export async function getUser(userID, username, loggedInUserID) {
  const [user, tweets] = await Promise.all([
    getUserQuery(userID, username, loggedInUserID),
    getTweetsFromUser(userID, username, loggedInUserID),
  ]);
  if (!user) return null;
  return {
    ...user,
    tweets,
  };
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

/**
 * Inserts (registers) a user with the given credentials, and returns the
 * created user's ID.
 */
export async function insertUser(username, hash, saltRounds, profilePictureURL) {
  /* eslint-disable camelcase */
  const { user_id } = await db.one(
    'INSERT INTO account (username, hash, salt_rounds, profile_picture_url) VALUES ($/username/, $/hash/, $/saltRounds/, $/profilePictureURL/) RETURNING user_id',
    {
      username,
      hash,
      saltRounds,
      profilePictureURL,
    },
  );
  console.log(user_id);
  return user_id;
}
