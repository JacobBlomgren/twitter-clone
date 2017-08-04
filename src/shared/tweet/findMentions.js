import R from 'ramda';

const regex = '@[a-zA-z0-9]+';

const matchMention = R.match(regex);

const checkLength = mention => mention.length <= 15;

const matches = R.compose(
  R.filter(checkLength),
  R.map(R.replace(/@/g, '')),
  matchMention,
);

/**
 * Finds all username mentions in a string. Enforces the app-wide 15 character username limit,
 * and filters out such matches.
 *
 * @param {string} str - The string to find matches in.
 * @returns {Array} - The array of matches. Empty if no matches are found.
 *
 * @example
 * findMentions('@jacob'); // => ['jacob']
 * findMentions('@longerThanFifteen'); // => []
 */
export default function(str) {
  const res = matches(str);
  return res !== null ? res : [];
}
