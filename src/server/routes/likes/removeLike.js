import { removeLike } from '../../db/queries/like/index';

export default async function(req, res) {
  try {
    await removeLike(req.body.tweet_id, req.user.id);
    res.status(200).json({ status: `Removed like for ${req.body.tweet_id}` });
  } catch (err) {
    res.status(500).end();
  }
}
