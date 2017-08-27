import R from 'ramda';

import regex from './hashtagRegex';

const matchHashtag = R.match(regex);

const matches = R.compose(R.uniq, R.map(R.replace(/#/g, '')), matchHashtag);

/**
 * Finds all unique hashtags in a string. A hashtag is defined as a hashtag sign (#),
 * followed by a string of letters, that is ended with either whitespace or punctuation.
 *
 * Punctuation is defined as the following characters !"#$%&'()*+,-./:;<=>¿?@[\]^_`{|}~
 * and unicode punctuation — the General Punctuation block (\u2000-\u206F) and the
 * Supplemental Punctuation block (\u2E00-\u2E7F).
 *
 * See {@link https://stackoverflow.com/a/25575009}
 * @param {string} str - The string to find matches in.
 * @returns {[string]} - The array of matches. Empty if no matches are found.
 */
export default function(str) {
  const res = matches(str);
  return res !== null ? res : [];
}
