import * as R from 'ramda';

import { camelizeKeys } from 'humps';

function transform(key) {
  return /^(id|url)$/i.test(key) ? key : key.replace(/(id|url)/i, R.toUpper);
}

/**
 * Converts the keys of obj to camel case, except for the abbreviations id and url,
 * which are transformed to uppercase, if the key is not only the abbrevation.
 *
 * @example
 * camelizeKeys({ user_id: '1'}); // => { userID: '1' }
 * camelizeKeys({ profile_picture_url: 'me.png'}); // => { profilePictureURL: 'me.png' }
 * camelizeKeys({ id: '1'}); // => { id: '1' }
 */
export default function(obj) {
  return camelizeKeys(obj, (key, convert) => convert(transform(key)));
}
