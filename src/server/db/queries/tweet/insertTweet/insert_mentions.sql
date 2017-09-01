-- Find the corresponding user_id of username and then insert that.
INSERT INTO mentions (tweet_id, username, user_id)
  SELECT tweet_id, username, user_id
--  When creating a values table, it seems like this conversion is necessary, while it isn't elsewhere.
-- The arguments are actually strings since Javascript can't handle 64-bit ints.
  FROM account, (VALUES (CAST($1 AS BIGINT))) AS t (tweet_id)
  WHERE username = $2;
