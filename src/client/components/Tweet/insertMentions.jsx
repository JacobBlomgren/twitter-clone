import React from 'react';

import Mention from './Mention';
import mentionRegex from '../../shared/tweet/mentionRegex';

// Recursively find all mentions and convert them to mention components
function insertMentions(str, acc) {
  // Base case, return the accumulated list of strings and Mention components
  // if no other mention is found.
  const index = str.search(mentionRegex);
  if (index === -1) return [...acc, str];
  const before = str.slice(0, index);
  const [mention] = mentionRegex.exec(str);
  const after = str.slice(index + mention.length);
  return insertMentions(after, [
    ...acc,
    before,
    <Mention mention={mention} key={mention} />,
  ]);
}

export default str => insertMentions(str, []);
