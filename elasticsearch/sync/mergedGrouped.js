import * as R from 'ramda';

/**
 * Groups a list of mixed user and tweet updates, and merges updates with the
 * same id, by keeping the most recent update value if the key is the same.
 * If the updates use different methods, the index and delete methods will be
 * prioritized.
 *
 * In the unlikely scenario where a delete and index operation is processed for
 * the same tweet or user, both updates will be omitted.
 *
 * @param {[object]} msgLst - a list of messages, with the most recent updates first.
 * @returns {{ users: [object], tweets: [object] }}
 *  { users: [list of user updates], tweets: [list of tweet updates ] }
 */
export default function mergedGrouped(msgLst) {
  // Merges two objects by keeping the first objects value for each key,
  // unless the key is 'method' and one of the values are 'index'.
  const mergeSameID = R.mergeWithKey((key, left, right) => {
    if (key === 'method') {
      // Guard against the veeery unlikely scenario where a create and delete
      // operation is processed in the same batch.
      if (left === 'delete' && right === 'index') return 'invalid';
      if (right === 'index' || left === 'index') return 'index';
      if (left === 'delete' || right === 'delete') return 'delete';
    }
    return left;
  });
  const merge = groupProp =>
    R.pipe(
      // Groups the list of messages by groupProp, e.g. with groupProp == id
      // [{ userID: '1', a: 1 }, { userID: '1', a: 2 }, { userID: '2', a: 0 }] =>
      // {
      //   '1': [{ userID: '1', a: 1 }, { userID: '1', a: 2 }],
      //   '2': [{ userID: '2', a: 0 }]
      // }
      R.groupBy(R.prop(groupProp)),
      // Map over the grouped messages and merge them with mergeSameID
      // {
      //   '1': [{ userID: '1', a: 1 }, { userID: '1', a: 2 }],
      //   '2': [{ userID: '2', a: 0 }]
      // } =>
      // {
      //   '1': { userID: '1', a: 1 }
      //   '2': { userID: '2', a: 0 }
      // }
      R.map(R.reduce(mergeSameID, {})),
      R.values,
      R.reject(R.propEq('method', 'invalid')),
    );

  return R.pipe(
    R.groupBy(msg => {
      if (msg.userID) return 'users';
      if (msg.tweetID) return 'tweets';
      // for the future.
      return 'other';
    }),
    R.evolve({
      users: merge('userID'),
      tweets: merge('tweetID'),
    }),
    ({ users, tweets }) => ({ users: users || [], tweets: tweets || [] }),
  )(msgLst);
}
