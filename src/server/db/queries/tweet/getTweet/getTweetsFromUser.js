import R from 'ramda';

import { db } from '../../../connection';
import getTweetWithTask from './getTweetWithTask';

export default async function(userID) {
  return db.task('get tweets from user', async task => {
    const response = await task.any(
      'SELECT tweet_id FROM tweet WHERE user_id = $1',
      userID,
    );
    /* The response is of the format [{tweet_id:1}, {tweet_id:2}]
    so we get the tweet_id property of every object. */
    const tweetIDs = R.pluck('tweet_id', response);
    const tweetQueries = tweetIDs.map(id => getTweetWithTask(task, id));
    return Promise.all(tweetQueries);
  });
}
