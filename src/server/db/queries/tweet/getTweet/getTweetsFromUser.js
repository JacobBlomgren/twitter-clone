import * as R from 'ramda';

import { db } from '../../../connection';
import getTweetWithTask from './getTweetWithTask';
import getQueryFile from '../../../getQueryFile';

const getTweetIDS = getQueryFile('tweet/getTweet/get_tweet_ids_from_user');

/**
 * Gets all tweets from the user with id userID.
 * @returns {Promise<array>} tweets - an array of all tweets.
 * @see {@link getTweet}
 */
export default async function(userID, username, loggedInUserID) {
  return db.task('get tweets from user', async task => {
    const [tweetIDs, user] = await Promise.all([
      task.any(getTweetIDS, [userID, username]),
      task.oneOrNone(
        'SELECT name, username, user_id FROM account WHERE user_id = $1 OR username = $2',
        [userID, username],
      ),
    ]);
    if (!user) return null;
    const tweetQueries = tweetIDs.map(({ tweet_id: id }) =>
      getTweetWithTask(task, id, loggedInUserID),
    );
    const tweets = await Promise.all(tweetQueries);
    return tweets.map(t => {
      const retweetInfo = R.find(R.propEq('tweet_id', t.id), tweetIDs);
      if (!retweetInfo.retweet) return t;
      // Add retweet info if the author of the tweet doesn't match userID.
      return {
        ...t,
        retweet: {
          user_id: user.user_id,
          username: user.username,
          name: user.name,
          created_at: retweetInfo.created_at,
        },
      };
    });
  });
}
