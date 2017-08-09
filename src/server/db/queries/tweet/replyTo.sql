-- Find the user_id that posted the original tweet and then insert that.
INSERT INTO reply_to (reply, original, original_user_id)
  SELECT reply, id, user_id
  FROM tweet, (VALUES ($1)) AS t (reply)
  WHERE id = $2;
