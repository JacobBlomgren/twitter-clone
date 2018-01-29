import * as R from 'ramda';

/**
 * Groups a list of mixed user and tweet updates, and sorts out duplicates by
 * keeping the most recent update. The property for users or tweets will be left
 * out if there were no updates for the respective group.
 * @param msgLst a list of messages, with the most recent updates first.
 * @returns { users: [list of user updates], tweets: [list of tweet updates ] }
 */
export default function uniqueGrouped(msgLst) {
  return R.pipe(
    R.groupBy(msg => {
      if (msg.userID) return 'users';
      if (msg.tweetID) return 'tweets';
      // for the future.
      return 'other';
    }),
    R.evolve({
      users: R.uniqBy(R.prop('userID')),
      tweets: R.uniqBy(R.prop('tweetID')),
    }),
  )(msgLst);
}
