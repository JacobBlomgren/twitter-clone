import { addLike } from '../../db/queries/like/index';

export default async function(req, res) {
  try {
    await addLike(req.body.tweet_id, req.user.id);
    res.status(200).json({ status: `Liked ${req.body.tweet_id}` });
  } catch (err) {
    res.status(500).end();
  }
}
