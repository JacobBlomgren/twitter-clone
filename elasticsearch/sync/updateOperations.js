import * as R from 'ramda';

import mergedGrouped from './mergedGrouped';

/**
 * Takes a message list of mixed user and tweet updates, and returns the body
 * of a bulk update, as specified by the bulk update elasticsearch API.
 *
 * The method for each of the update is specified by a method property in each
 * object, see the example. It's the caller's responsibility to provide a valid
 * method.
 *
 * @example
 * updateOperations({ userID: '1', name: 'Jacob', method: 'update' })
 * returns
 * [
 *   { update: { _index: 'twitter', _type: 'user', _id: '1' }},
 *   { doc: { name: 'Jacob'} },
 * ]
 * @param {[object]} msgLst - a message list
 * @returns {[object]} a list of updates as specified by the elasticsearch API.
 */
export default function updateOperations(msgLst) {
  const grouped = mergedGrouped(msgLst);

  const formatSource = (method, source) =>
    method === 'update' ? { doc: source } : source;

  const userUpdates = !grouped.users
    ? []
    : grouped.users.map(({ method, userID, ...user }) => [
        {
          [method]: {
            _index: 'twitter',
            _type: 'user',
            _id: userID,
          },
        },
        formatSource(method, user),
      ]);

  const tweetUpdates = !grouped.tweets
    ? []
    : grouped.tweets.map(({ method, tweetID, ...tweet }) => [
        {
          [method]: {
            _index: 'twitter',
            _type: 'tweet',
            _id: tweetID,
          },
        },
        formatSource(method, tweet),
      ]);

  return R.concat(R.flatten(userUpdates), R.flatten(tweetUpdates));
}
