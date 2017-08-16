import insertTweet from '../db/queries/tweet/insertTweet';
import getTweet from '../db/queries/tweet/getTweet';
import findHashtags from '../../shared/tweet/findHashtags';
import findMentions from '../../shared/tweet/findMentions';

export default async function(userID, content, replyTo) {
  const hashtags = findHashtags(content);
  const mentions = findMentions(content);
  const tweetID = await insertTweet(
    userID,
    content,
    hashtags,
    mentions,
    replyTo,
  );
  return getTweet(tweetID);
}
