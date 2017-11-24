SELECT account.username, account.name, account.user_id as id
FROM account,
  (SELECT follower
  FROM follows
  WHERE followee = $1) AS followers
WHERE account.user_id = followers.follower;
