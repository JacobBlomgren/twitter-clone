import R from 'ramda';

import { decamelizeKeys } from 'humps';

const regex = /[A-Z]{2,}/g;

const replace = str =>
  R.concat(R.head(str), R.compose(R.toLower, R.slice(1, Infinity))(str));

function transform(key) {
  return key.replace(regex, replace);
}

/**
 * Converts the keys of obj from camel case to snake case, consecutive capital letters are treated as
 * abbreviations rather than separate words.
 *
 * @example
 * decamelizeKeys({ profilePicture: 'me.png'}); // => { profile_picture: 'me.png' }
 * decamelizeKeys({ userID: '1'}); // => { user_id: '1' }
 */
export default function(obj) {
  return decamelizeKeys(obj, (key, convert) => convert(transform(key)));
}
