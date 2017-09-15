import { db } from '../../../connection';
import getTweetWithTask from './getTweetWithTask';

/**
 * Gets a tweet from the database
 * @param tweetID
 * @param loggedInUserID
 * @returns {Promise<Object>} tweet - the tweet with id tweetID.
 * @return {string} tweet.id
 * @return {string} tweet.username
 * @return {string} tweet.user_id
 * @return {string} tweet.content
 * @return {string}tweet.created_at
 * @return {boolean} tweet.liked
 * * @return {boolean} tweet.retweeted
 * @return {Object} tweet.reply_to
 * @return {string} tweet.reply_to.original_tweet_id
 * @return {string} tweet.reply_to.original_username
 * @return {string} tweet.reply_to.original_user_id
 * @return {Array.<string>} replies
 * @return {Array.<string>} hashtags
 * @return {[{username: string, user_id: string}]} mentions
 */
export default async function(tweetID, loggedInUserID) {
  return db.task('get tweet', async task =>
    getTweetWithTask(task, tweetID, loggedInUserID),
  );
}
