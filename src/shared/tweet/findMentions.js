import R from 'ramda';

const regex = /@[a-zA-z0-9]{1,15}/g;

const matchMention = R.match(regex);

const matches = R.compose(R.map(R.replace(/@/g, '')), matchMention);

/**
 * Finds all username mentions in a string. If a mention breaks a username rule,
 * everything up to the character where the rule is broken will be matched. A single "@"
 * followed by a non-username character will not be matched
 *
 * @param {string} str - The string to find matches in.
 * @returns {Array} - The array of matches. Empty if no matches are found.
 *
 * @example
 * findMentions('@jacob'); // => ['jacob']
 * findMentions('@longerThanFifteen'); // => ['longerThanFifte']
 * findMentions('@aaá'); // => ['aa]
 * findMentions('@'); // => []
 */
export default function(str) {
  const res = matches(str);
  return res !== null ? res : [];
}
