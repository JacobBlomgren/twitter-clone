import joi from 'joi';
import celebrate from 'celebrate';

import { updateDescription as updateDescriptionQuery } from '../../db/queries/settings/';

export async function updateDescription(req, res) {
  try {
    await updateDescriptionQuery(req.user.id, req.body.description);
    res
      .status(201)
      .json({ status: `Updated description to ${req.body.description}` });
  } catch (err) {
    res.status(500).end();
  }
}

export const validate = celebrate({
  body: joi.object().keys({
    description: joi.string().required(),
  }),
});
