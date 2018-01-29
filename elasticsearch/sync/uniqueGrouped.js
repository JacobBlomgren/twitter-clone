import * as R from 'ramda';

/**
 * Groups a list of mixed user and tweet updates, and sorts out duplicates by
 * keeping the most recent update.
 * @param msgLst a list of messages, with the most recent updates first.
 */
export default function uniqueGrouped(msgLst) {
  const users = R.pipe(R.filter(R.has('userID')), R.uniqBy(R.prop('userID')))(
    msgLst,
  );
  const tweets = R.pipe(
    R.filter(R.has('tweetID')),
    R.uniqBy(R.prop('tweetID')),
  )(msgLst);
  return { users, tweets };
}
