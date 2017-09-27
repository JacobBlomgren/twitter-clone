import R from 'ramda';

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
    const [response, user] = await Promise.all([
      task.any(getTweetIDS, [userID, username]),
      task.one(
        'SELECT name, username, user_id FROM account WHERE user_id = $1 OR username = $2',
        [userID, username],
      ),
    ]);
    /* The response is of the format [{tweet_id:1}, {tweet_id:2}]
    so we get the tweet_id property of every object. */
    const tweetIDs = R.pluck('tweet_id', response);
    const tweetQueries = tweetIDs.map(id =>
      getTweetWithTask(task, id, loggedInUserID),
    );
    const tweets = await Promise.all(tweetQueries);
    return tweets.map(t => {
      const retweetInfo = R.find(R.propEq('tweet_id', t.id), response);
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
