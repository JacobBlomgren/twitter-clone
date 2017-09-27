WITH u AS (SELECT user_id FROM account WHERE user_id = $1 OR username = $2)
SELECT tweet_id, created_at, retweet
FROM
  (SELECT tweet_id, created_at, r.retweet
  FROM tweet, u, (VALUES (FALSE)) AS r (retweet)
  WHERE tweet.user_id = u.user_id
  UNION
  SELECT tweet_id, created_at, r.retweet
  FROM retweet, u, (VALUES (TRUE)) AS r (retweet)
  WHERE retweet.user_id = u.user_id) AS tweets
ORDER BY created_at DESC;
