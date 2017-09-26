import { unfollow } from '../../db/queries/follow';

export default async function(req, res) {
  try {
    const unfollowed = await unfollow(req.user.id, req.body.user_id);
    if (!unfollowed) {
      res.status(404).json({
        error: `The user with user_id ${req.body.user_id} is not followed`,
      });
    }
    res.status(204).json({ status: `Unfollowed ${req.body.user_id}` });
  } catch (err) {
    res.status(500).end();
  }
}
