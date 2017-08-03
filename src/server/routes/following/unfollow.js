import { unfollow } from '../../db/queries/follow';

export default async function(req, res) {
  try {
    await unfollow(req.user.id, req.body.user_id);
    res.status(204).json({ status: `Unfollowed ${req.body.user_id}` });
  } catch (err) {
    res.status(500).end();
  }
}
