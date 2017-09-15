SELECT tweet.tweet_id AS id, account.username, account.name, tweet.user_id, tweet.content, tweet.created_at,
  likes.count AS like_count, retweets.count AS retweet_count,
  EXISTS(SELECT * FROM likes WHERE tweet_id = $1 AND user_id = $2) AS liked,
  EXISTS(SELECT * FROM retweet WHERE tweet_id = $1 AND user_id = $2) AS retweeted
FROM tweet, account,
  (SELECT COUNT(user_id) FROM likes WHERE tweet_id = $1) AS likes,
  (SELECT COUNT(user_id) FROM retweet WHERE tweet_id = $1) AS retweets
WHERE tweet_id = $1 AND tweet.user_id = account.user_id;
