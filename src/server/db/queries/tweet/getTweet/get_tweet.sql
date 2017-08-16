SELECT tweet.tweet_id AS id, account.username, tweet.user_id, tweet.content, tweet.created_at
FROM tweet, account
WHERE tweet_id = $1 AND tweet.user_id = account.user_id;
