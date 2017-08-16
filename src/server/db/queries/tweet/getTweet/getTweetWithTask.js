import getQueryFile from '../../../getQueryFile';

const getTweetQueryFile = getQueryFile('tweet/getTweet/get_tweet');
const getHashtagsQueryFile = getQueryFile('tweet/getTweet/get_hashtags');
const getMentionsQueryFile = getQueryFile('tweet/getTweet/get_mentions');
const getReplyToQueryFile = getQueryFile('tweet/getTweet/get_reply_to');

export default async function(task, tweetID) {
  const tweet = await task.oneOrNone(getTweetQueryFile, tweetID);
  if (tweet === null) return Promise.resolve(null);
  const [replyTo, hashtags, mentions] = await Promise.all([
    task.oneOrNone(getReplyToQueryFile, tweetID),
    task.manyOrNone(getHashtagsQueryFile, tweetID),
    task.manyOrNone(getMentionsQueryFile, tweetID),
  ]);
  return {
    ...tweet,
    reply_to: replyTo,
    hashtags,
    mentions,
  };
}
