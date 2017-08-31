SELECT account.name, account.username, account.description, account.created_at,
  followers.follower_count, following.following_count
FROM account,
  (SELECT COUNT(follower) AS follower_count
   FROM follows
   WHERE followee = $1) AS followers,
  (SELECT COUNT(followee) AS following_count
   FROM follows
   WHERE follower = $1) AS following
WHERE account.user_id = $1;
