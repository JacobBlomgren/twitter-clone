import R from 'ramda';

import { decamelizeKeys } from 'humps';

const regex = /[A-Z]{2,}/g;

const replace = str =>
  R.concat(R.head(str), R.compose(R.toLower, R.slice(1, Infinity))(str));

function transform(key) {
  return key.replace(regex, replace);
}

export default function(obj) {
  return decamelizeKeys(obj, (key, convert) => convert(transform(key)));
}
