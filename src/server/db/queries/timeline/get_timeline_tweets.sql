SELECT tweet.tweet_id,
  COALESCE(
    (SELECT original_user_id
    FROM reply_to
    WHERE reply_tweet_id = tweet.tweet_id
    )
  ) AS reply_to_user
FROM tweet, (SELECT followee FROM follows WHERE follower = $1) AS followed
WHERE tweet.user_id = followed.followee
ORDER BY tweet.created_at
LIMIT 800;
