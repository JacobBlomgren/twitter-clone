WITH users AS (
  SELECT user_id, name, username, description, profile_picture_url
  FROM account
  WHERE user_id IN ($1:csv)
)
SELECT users.user_id AS id, users.name, users.username, users.description,
users.profile_picture_url, followed.follows
FROM users LEFT JOIN LATERAL (
  SELECT EXISTS(
    SELECT *
    FROM follows
    WHERE followee = users.user_id AND follower = $2
  ) AS follows, users.user_id
) followed ON followed.user_id = users.user_id;
