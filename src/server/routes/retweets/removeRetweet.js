import removeRetweet from '../../db/queries/tweet/removeRetweet';

export default async function(req, res) {
  try {
    await removeRetweet(req.body.tweet_id, req.user.id);
    res.status(200).json({ status: `Removed retweet of ${req.body.tweet_id}` });
  } catch (err) {
    res.status(500).end();
  }
}
