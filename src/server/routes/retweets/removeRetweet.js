import removeRetweet from '../../db/queries/tweet/removeRetweet';

export default async function(req, res) {
  try {
    const removed = await removeRetweet(req.body.tweet_id, req.user.id);
    if (!removed) {
      res.status(404).json({
        error: 'Cannot remove tweet of non-retweete tweet',
      });
    }
    res.status(200).json({ status: `Removed retweet of ${req.body.tweet_id}` });
  } catch (err) {
    res.status(500).end();
  }
}
