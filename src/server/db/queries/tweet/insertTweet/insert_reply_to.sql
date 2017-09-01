-- Find the user_id that posted the original tweet and then insert that.
INSERT INTO reply_to (reply_tweet_id, original_tweet_id, original_user_id)
  SELECT reply, tweet_id, user_id
--  When creating a values table, it seems like this conversion is necessary, while it isn't elsewhere.
-- The arguments are actually strings since Javascript can't handle 64-bit ints.
  FROM tweet, (VALUES (CAST($1 AS BIGINT))) AS t (reply)
  WHERE tweet_id = $2;
