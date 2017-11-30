SELECT account.username, account.name, account.user_id as id, account.profile_picture_url
FROM account,
  (SELECT followee
  FROM follows
  WHERE follower = $1) AS followers
WHERE account.user_id = followers.followee;
