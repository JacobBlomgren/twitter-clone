-- Find the corresponding user_id of username and then insert that.
INSERT INTO mentions (tweet_id, username, user_id)
  SELECT tweet_id, username, id AS user_id
  FROM account, (VALUES ($1)) AS t (tweet_id)
  WHERE username = $2;
