import { db } from '../../../connection';

export default async function(tweetID, userID) {
  return db.oneOrNone(
    'DELETE FROM tweet WHERE tweet_id = $/tweetID/ AND user_ID = $/userID/ RETURNING *',
    {
      tweetID,
      userID,
    },
  );
}
