WITH RECURSIVE children AS (
    SELECT reply_tweet_id
    FROM reply_to
    WHERE reply_to.original_tweet_id = $1
  UNION
    SELECT reply_to.reply_tweet_id
    FROM children, reply_to
    WHERE reply_to.original_tweet_id = children.reply_tweet_id
), parents AS (
    SELECT original_tweet_id
    FROM reply_to
    WHERE reply_to.reply_tweet_id = $1
  UNION
    SELECT reply_to.original_tweet_id
    FROM parents, reply_to
    WHERE reply_to.reply_tweet_id = parents.original_tweet_id
)
SELECT JSON_AGG(parents.original_tweet_id) AS parent_ids, JSON_AGG(children.reply_tweet_id) AS children_ids
FROM parents, children;
