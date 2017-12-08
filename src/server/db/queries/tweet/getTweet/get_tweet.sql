WITH RECURSIVE replies AS (
    SELECT reply_tweet_id
    FROM reply_to
    WHERE reply_to.original_tweet_id = $1
  UNION
    SELECT reply_to.reply_tweet_id
    FROM replies, reply_to
    WHERE reply_to.original_tweet_id = replies.reply_tweet_id
), reply_agg AS (
  SELECT COUNT(reply_tweet_id) AS reply_count
  FROM replies
)
SELECT tweet.tweet_id AS id, account.username, account.name, tweet.user_id,
  tweet.content, tweet.created_at, likes.count AS like_count, reply_count,
  retweets.count AS retweet_count,
  EXISTS(SELECT * FROM likes WHERE tweet_id = $1 AND user_id = $2) AS liked,
  EXISTS(SELECT * FROM retweet WHERE tweet_id = $1 AND user_id = $2) AS retweeted,
  COALESCE(
    (SELECT ROW_TO_JSON(reply)
    FROM (
      SELECT reply_to.original_tweet_id,
      account.username AS original_username,
      reply_to.original_user_id
      FROM reply_to, account
      WHERE reply_to.reply_tweet_id = $1 AND reply_to.original_user_id = account.user_id
    ) AS reply)
  ) AS reply_to
FROM tweet, account, reply_agg,
  (SELECT COUNT(user_id) FROM likes WHERE tweet_id = $1) AS likes,
  (SELECT COUNT(user_id) FROM retweet WHERE tweet_id = $1) AS retweets
WHERE tweet_id = $1 AND tweet.user_id = account.user_id;
