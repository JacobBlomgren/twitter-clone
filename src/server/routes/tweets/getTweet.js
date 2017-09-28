import joi from 'joi';
import celebrate from 'celebrate';

import id from '../middleware/validation/id';
import getTweetWithReplies from '../../db/queries/tweet/getTweet/getTweetWithReplies';

export async function getTweet(req, res) {
  try {
    const response = await getTweetWithReplies(req.query.tweet_id);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    console.log(err);
    res.status(500).end();
  }
}

export const validate = celebrate({
  query: joi.object().keys({
    tweet_id: id.required(),
  }),
});
