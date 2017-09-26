import { removeLike } from '../../db/queries/like/index';

export default async function(req, res) {
  try {
    const removed = await removeLike(req.body.tweet_id, req.user.id);
    if (!removed) {
      res.status(404).json({
        error: 'Cannot remove like of non-liked tweet',
      });
    }
    res.status(200).json({ status: `Removed like for ${req.body.tweet_id}` });
  } catch (err) {
    res.status(500).end();
  }
}
