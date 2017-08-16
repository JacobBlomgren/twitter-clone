SELECT reply_to.original_tweet_id, account.username AS original_username, reply_to.original_user_id
FROM reply_to, account
WHERE reply_to.reply_tweet_id = $1 AND reply_to.original_user_id = account.user_id
