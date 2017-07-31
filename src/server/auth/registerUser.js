import bcrypt from 'bcryptjs';
import { insertUser } from '../db/queries';

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
    return insertUser(username, hash, saltRounds);
  } catch (err) {
    return Promise.reject(err);
  }
}
