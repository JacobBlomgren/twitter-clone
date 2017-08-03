import { insertTweet } from '../../db/queries/tweet/index';

export default async function(req, res) {
  try {
    // First naive implementation
    if (req.body.content.length > 140) {
      res
        .status(400)
        .json({ error: 'Tweet cannot be larger than 140 characters' });
    }
    await insertTweet(req.user.id, req.body.content);
    res.status(200).json({ status: 'Posted tweet' });
  } catch (err) {
    res.status(500).end();
  }
}
