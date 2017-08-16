import joi from 'joi';
import celebrate from 'celebrate';

import { removeTweet as removeTweetQuery } from '../../db/queries/tweet/index';
import id from '../middleware/validation/id';

export async function removeTweet(req, res) {
  try {
    const removed = await removeTweetQuery(req.body.tweet_id, req.user.id);
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

export const validate = celebrate({
  body: joi.object().keys({
    tweet_id: id.required(),
  }),
});
