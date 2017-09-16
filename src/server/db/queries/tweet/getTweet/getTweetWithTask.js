import R from 'ramda';

import getQueryFile from '../../../getQueryFile';

const getTweetQueryFile = getQueryFile('tweet/getTweet/get_tweet');
const getHashtagsQueryFile = getQueryFile('tweet/getTweet/get_hashtags');
const getMentionsQueryFile = getQueryFile('tweet/getTweet/get_mentions');
const getReplyToQueryFile = getQueryFile('tweet/getTweet/get_reply_to');
const getRepliesQueryFile = getQueryFile('tweet/getTweet/get_replies');

/**
 * Gets a tweet with a database task so that the same connection can be used if many tweets are looked up.
 * Just create, and pass a new task if just one tweet is looked up.
 */
export default async function(task, tweetID, loggedInUserID) {
  const tweet = await task.oneOrNone(getTweetQueryFile, [
    tweetID,
    loggedInUserID,
  ]);
  if (tweet === null) return Promise.resolve(null);
  const [replyTo, replies, hashtags, mentions] = await Promise.all([
    task.oneOrNone(getReplyToQueryFile, tweetID),
    task.any(getRepliesQueryFile, tweetID),
    task.manyOrNone(getHashtagsQueryFile, tweetID),
    task.manyOrNone(getMentionsQueryFile, tweetID),
  ]);
  return {
    ...tweet,
    reply_to: replyTo,
    // the response is of the format [{ reply_tweet_id: 1 }, { reply_tweet_id: 2 }]
    // so convert it to an array of just the IDs.
    replies: R.pluck('reply_tweet_id', replies),
    hashtags: R.pluck('hashtag', hashtags),
    mentions,
    like_count: parseInt(tweet.like_count, 10),
    retweet_count: parseInt(tweet.retweet_count, 10),
  };
}
