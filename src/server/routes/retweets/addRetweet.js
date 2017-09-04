import insertRetweet from '../../db/queries/tweet/insertRetweet';

export default async function(req, res) {
  try {
    await insertRetweet(req.body.tweet_id, req.user.id);
    res.status(200).json({ status: `Retweeted ${req.body.tweet_id}` });
  } catch (err) {
    res.status(500).end();
  }
}
