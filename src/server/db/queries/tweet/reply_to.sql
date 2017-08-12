-- Find the user_id that posted the original tweet and then insert that.
INSERT INTO reply_to (reply_tweet_id, original_tweet_id, original_user_id)
  SELECT reply, tweet_id, user_id
  FROM tweet, (VALUES ($1)) AS t (reply)
  WHERE tweet_id = $2;
