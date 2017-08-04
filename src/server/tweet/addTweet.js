import { insertTweet } from '../db/queries/tweet';
import findHashtags from '../../shared/tweet/findHashtags';

export default async function(userID, content) {
  const hashtags = findHashtags(content);
  await insertTweet(userID, content, hashtags);
}
