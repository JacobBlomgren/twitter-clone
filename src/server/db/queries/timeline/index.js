import * as R from 'ramda';

import { db } from '../../connection';

import getQueryFile from '../../getQueryFile';
import getTweetWithTask from '../tweet/getTweet/getTweetWithTask';

const getTimeLineTweetsQueryFile = getQueryFile('timeline/get_timeline_tweets');

export default async function getTimeLine(loggedInUserID) {
  return db.task('get tweets from user', async task => {
    const [IDs, following] = await Promise.all([
      task.any(getTimeLineTweetsQueryFile, loggedInUserID),
      task.any(
        'SELECT followee FROM follows WHERE follower = $1',
        loggedInUserID,
      ),
    ]);
    // filter replies to users that aren't followed
    const filtered = IDs.filter(
      ({ reply_to_user: replyUser }) =>
        replyUser === null || R.contains({ followee: replyUser }, following),
    );
    // eslint-disable-next-line camelcase
    const queries = filtered.map(({ tweet_id }) =>
      getTweetWithTask(task, tweet_id, loggedInUserID),
    );
    return Promise.all(queries);
  });
}
