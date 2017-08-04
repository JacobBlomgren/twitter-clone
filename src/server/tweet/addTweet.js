import { insertTweet } from '../db/queries/tweet';
import findHashtags from '../../shared/tweet/findHashtags';
import findMentions from '../../shared/tweet/findMentions';

export default async function(userID, content) {
  const hashtags = findHashtags(content);
  const mentions = findMentions(content);
  await insertTweet(userID, content, hashtags, mentions);
}
