SELECT tweet_id
FROM
  (SELECT tweet_id, created_at FROM tweet WHERE user_id = $1
  UNION
  SELECT tweet_id, created_at FROM retweet WHERE user_id = $1) AS tweets
ORDER BY created_at;
