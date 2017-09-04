import { db } from '../../../connection';

export default async function(tweetID, userID) {
  return db.none(
    'DELETE FROM tweet WHERE tweet_id = $/tweetID/ AND user_ID = $/userID/',
    {
      tweetID,
      userID,
    },
  );
}
