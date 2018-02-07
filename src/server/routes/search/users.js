import joi from 'joi';
import { celebrate } from 'celebrate';

import { searchUsers as searchUsersQuery } from '../../elasticsearch/search';

export async function searchUsers(req, res) {
  try {
    const response = await searchUsersQuery(req.query.q, req.loggedInUserID);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).end();
  }
}

export const validate = celebrate({
  query: joi.object().keys({
    q: joi.string().required(),
  }),
});
