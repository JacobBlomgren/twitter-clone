import getQueryFile from '../../../getQueryFile';

const getTweetQueryFile = getQueryFile('tweet/getTweet/get_tweet');
const getReplyToQueryFile = getQueryFile('tweet/getTweet/get_reply_to');

/**
 * Gets a tweet with a database task so that the same connection can be used if many tweets are looked up.
 * Just create, and pass a new task if just one tweet is looked up.
 */
export default async function(task, tweetID, loggedInUserID) {
  const [tweet, replyTo] = await Promise.all([
    task.oneOrNone(getTweetQueryFile, [tweetID, loggedInUserID]),
    task.oneOrNone(getReplyToQueryFile, tweetID),
  ]);
  if (!tweet) return Promise.resolve(null);
  return {
    ...tweet,
    reply_to: replyTo,
  };
}
