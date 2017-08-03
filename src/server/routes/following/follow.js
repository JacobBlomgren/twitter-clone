import { follow } from '../../db/queries/follow';

export default async function(req, res) {
  try {
    await follow(req.user.id, req.body.user_id);
    res.status(200).json({ status: `Followed ${req.body.user_id}` });
  } catch (err) {
    res.status(500).end();
  }
}
