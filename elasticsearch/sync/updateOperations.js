import * as R from 'ramda';

import uniqueGrouped from './uniqueGrouped';

/**
 * Takes a message list of mixed user and tweet updates, and returns the body
 * of a bulk update, as specified by the bulk update elasticsearch API.
 */
export default function updateOperations(msgLst) {
  const grouped = uniqueGrouped(msgLst);

  const userActions = grouped.users.map(user => [
    { update: { _index: 'user', _id: user.userID } },
    { name: user.name },
  ]);

  const tweetActions = grouped.tweets.map(tweet => [
    { index: { _index: 'tweet', _id: tweet.tweetID } },
    { hashtags: tweet.hashtags },
  ]);

  return R.concat(R.flatten(userActions), R.flatten(tweetActions));
}
