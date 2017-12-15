import getQueryFile from '../../../getQueryFile';

const getTweetQueryFile = getQueryFile('tweet/getTweet/get_tweet');

/**
 * Gets a tweet with a database task so that the same connection can be used if many tweets are looked up.
 * Just create, and pass a new task if just one tweet is looked up.
 */
export default async function(task, tweetID, loggedInUserID) {
  const tweet = await task.oneOrNone(getTweetQueryFile, [
    tweetID,
    loggedInUserID,
  ]);
  if (!tweet) return Promise.resolve(null);
  return {
    ...tweet,
    // The reply_to subquery returns the ids as integers rather than strings (wanted)
    reply_to: tweet.reply_to && {
      ...tweet.reply_to,
      original_tweet_id: String(tweet.reply_to.original_tweet_id),
      original_user_id: String(tweet.reply_to.original_user_id),
    },
    reply_count: parseInt(tweet.reply_count, 10),
    retweet_count: parseInt(tweet.retweet_count, 10),
    like_count: parseInt(tweet.like_count, 10),
  };
}
