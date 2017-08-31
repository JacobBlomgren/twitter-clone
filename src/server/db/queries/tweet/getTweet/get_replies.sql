WITH RECURSIVE replies AS (
    SELECT reply_tweet_id
    FROM reply_to
    WHERE reply_to.original_tweet_id = $1
  UNION
    SELECT reply_to.reply_tweet_id
    FROM replies, reply_to
    WHERE reply_to.original_tweet_id = replies.reply_tweet_id
)
SELECT reply_tweet_id FROM replies
