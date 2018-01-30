import * as R from 'ramda';

import uniqueGrouped from './uniqueGrouped';

/**
 * Takes a message list of mixed user and tweet updates, and returns the body
 * of a bulk update, as specified by the bulk update elasticsearch API.
 * @param {[object]} msgLst - a message list
 * @returns {[object]} a list of updates as specified by the elasticsearch API.
 */
export default function updateOperations(msgLst) {
  const grouped = uniqueGrouped(msgLst);

  const userUpdates = !grouped.users
    ? []
    : grouped.users.map(user => [
        { update: { _index: 'user', _id: user.userID } },
        R.dissoc('userID', user),
      ]);

  const tweetUpdates = !grouped.tweets
    ? []
    : grouped.tweets.map(tweet => [
        { index: { _index: 'tweet', _id: tweet.tweetID } },
        R.dissoc('tweetID', tweet),
      ]);

  return R.concat(R.flatten(userUpdates), R.flatten(tweetUpdates));
}
