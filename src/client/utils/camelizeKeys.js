import { camelizeKeys } from 'humps';

function transformID(key) {
  return /^id$/i.test(key) ? key : key.replace(/id/i, 'ID');
}

/**
 * Converts the keys of obj to camel case, except for the abbreviation id,
 * which is transformed to uppercase, if the key is not only id.
 *
 * @example
 * camelizeKeys({ user_id: '1'}); // => { userID: '1' }
 * camelizeKeys({ id: '1'}); // => { id: '1' }
 */
export default function(obj) {
  return camelizeKeys(obj, (key, convert) => convert(transformID(key)));
}
