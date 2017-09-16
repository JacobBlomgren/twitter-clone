import joi from 'joi';
import celebrate from 'celebrate';

import { getUser as getUserQuery } from '../../db/queries/user/index';
import getTweetsFromUser from '../../db/queries/tweet/getTweet/getTweetsFromUser';
import id from '../middleware/validation/id';
import username from '../middleware/validation/username';

export async function getUser(req, res) {
  if (!req.body.user_id && !req.body.username) return res.status(400).end();
  try {
    const [user, tweets] = await Promise.all([
      getUserQuery(req.body.user_id, req.body.username, req.loggedInUserID),
      getTweetsFromUser(
        req.body.user_id,
        req.body.username,
        req.loggedInUserID,
      ),
    ]);
    if (!user) return res.status(404).end();
    return res.status(200).json({
      ...user,
      tweets,
    });
  } catch (err) {
    return res.status(500).end();
  }
}

export const validate = celebrate({
  body: joi.object().keys({
    user_id: id,
    username,
  }),
});
