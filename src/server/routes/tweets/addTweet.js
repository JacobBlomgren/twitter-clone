import addTweetHelper from '../../tweet/addTweet';
import checkLengthHelper from '../../../shared/tweet/checkLength';

export async function addTweet(req, res) {
  try {
    const response = await addTweetHelper(
      req.user.id,
      req.body.content,
      req.body.reply_to,
    );
    res.status(200).json(response);
  } catch (err) {
    res.status(500).end();
  }
}

export function checkLength(req, res, next) {
  if (!checkLengthHelper(req.body.content)) {
    res
      .status(400)
      .json({ error: 'Tweet cannot be larger than 140 characters' });
  }
  return next();
}
