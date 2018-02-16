import bcrypt from 'bcryptjs';
import { insertUser } from '../db/queries/user';

const avatars = [
  '/static/avatars/1.png',
  '/static/avatars/2.png',
  '/static/avatars/3.png',
];

// random int between two min and max as suggested here
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);
  // The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (maxFloor - minCeil)) + minCeil;
}

/**
 * Registers a user with the provided arguments and hashes the password before inserting it in the database.
 * @param {string} username
 * @param {string} password
 * @returns {Promise.<*>}
 */
export default async function(username, password) {
  const saltRounds = 10;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    const profilePicture = avatars[getRandomInt(0, avatars.length)];
    return insertUser(username, hash, saltRounds, profilePicture);
  } catch (err) {
    return Promise.reject(err);
  }
}
