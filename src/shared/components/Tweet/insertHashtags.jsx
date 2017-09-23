import React from 'react';

import Hashtag from './Hashtag';
import { hashtagRegex } from '../../../shared/tweet/hashtagRegex';

// Recursively find all hashtags and convert them to Hashtag components
function insertHashtags(str, acc) {
  // Base case, return the accumulated list of strings and Hashtag components
  // if no other hashtag is found.
  const index = str.search(hashtagRegex);
  if (index === -1) return [...acc, str];
  const before = str.slice(0, index);
  const [hashtag] = hashtagRegex.exec(str);
  const after = str.slice(index + hashtag.length);
  return insertHashtags(after, [
    ...acc,
    before,
    <Hashtag hashtag={hashtag} key={hashtag} />,
  ]);
}

export default str => insertHashtags(str, []);
