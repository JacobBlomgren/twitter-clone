WITH u AS (SELECT user_id FROM account WHERE user_id = $1 OR username = $2)
SELECT tweet_id
FROM
  (SELECT tweet_id, created_at FROM tweet, u WHERE tweet.user_id = u.user_id
  UNION
  SELECT tweet_id, created_at FROM retweet, u WHERE retweet.user_id = u.user_id) AS tweets
ORDER BY created_at;
