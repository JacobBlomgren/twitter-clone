import joi from 'joi';
import celebrate from 'celebrate';

import { getUser as getUserQuery } from '../../db/queries/user/index';
import getTweetsFromUser from '../../db/queries/tweet/getTweet/getTweetsFromUser';
import id from '../middleware/validation/id';
import username from '../middleware/validation/username';

export async function getUser(req, res) {
  if (!req.query.id && !req.query.username) return res.status(400).end();
  try {
    const [user, tweets] = await Promise.all([
      getUserQuery(req.query.id, req.query.username, req.loggedInUserID),
      getTweetsFromUser(
        req.query.id,
        req.query.username,
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
  query: {
    id,
    username,
  },
});
