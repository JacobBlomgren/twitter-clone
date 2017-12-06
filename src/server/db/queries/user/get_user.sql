WITH selected_user AS (
  SELECT *
  FROM account
  WHERE account.user_id = $1 OR account.username = $2
), followers AS (
  SELECT COUNT(follower) AS follower_count
  FROM follows, selected_user
  WHERE followee = selected_user.user_id
), following AS (
  SELECT COUNT(followee) AS following_count
  FROM follows, selected_user
  WHERE follower = selected_user.user_id)
, followed AS (
  SELECT EXISTS(
    SELECT *
    FROM follows, selected_user
    WHERE followee = selected_user.user_id AND follower = $3
  ) AS follows
)
SELECT selected_user.user_id AS id,
selected_user.name,
selected_user.username,
selected_user.description,
selected_user.created_at,
followers.follower_count,
following.following_count,
followed.follows
FROM selected_user, followers, following, followed;
