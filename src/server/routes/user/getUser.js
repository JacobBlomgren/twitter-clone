import joi from 'joi';
import celebrate from 'celebrate';

import { getUser as getUserQuery } from '../../db/queries/user/index';
import id from '../middleware/validation/id';
import username from '../middleware/validation/username';

export async function getUser(req, res) {
  if (!req.query.id && !req.query.username) return res.status(400).end();
  try {
    const user = await getUserQuery(
      req.query.id,
      req.query.username,
      req.loggedInUserID,
    );
    if (!user) return res.status(404).end();
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}

export const validate = celebrate({
  query: joi.object().keys({
    id,
    username,
  }),
});
