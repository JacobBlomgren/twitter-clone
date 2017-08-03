import { removeTweet } from '../../db/queries/tweet/index';

export default async function(req, res) {
  try {
    const removed = await removeTweet(req.body.tweet_id, req.user.id);
    if (removed === null) {
      res.status(404).json({
        error:
          'Tweet either does not exist or the user does not own the tweet and consequently cannot delete it',
      });
    }
    res.status(200).json({ status: 'Removed tweet' });
  } catch (err) {
    res.status(500).end();
  }
}
