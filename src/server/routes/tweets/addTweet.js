import addTweet from '../../tweet/addTweet';
import checkLength from '../../../shared/tweet/checkLength';

export default async function(req, res) {
  try {
    if (!checkLength(req.body.content)) {
      res
        .status(400)
        .json({ error: 'Tweet cannot be larger than 140 characters' });
    }
    await addTweet(req.user.id, req.body.content, req.body.reply_to);
    res.status(200).json({ status: 'Posted tweet' });
  } catch (err) {
    res.status(500).end();
  }
}
