import joi from 'joi';
import celebrate from 'celebrate';

import { updateName as updateNameQuery } from '../../db/queries/settings/';

export async function updateName(req, res) {
  try {
    await updateNameQuery(req.user.id, req.body.name);
    res.status(201).json({ status: `Updated name to ${req.body.name}` });
  } catch (err) {
    res.status(500).end();
  }
}

export const validate = celebrate({
  body: joi.object().keys({
    name: joi.string().required(),
  }),
});
