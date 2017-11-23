import express from 'express';
import joi from 'joi';
import { celebrate } from 'celebrate';

import { updateDescription, updateName } from '../../db/queries/settings/index';
import { db } from '../../db/connection';
import loginRequired from '../middleware/loginRequired';

const router = express.Router();

async function settings(req, res) {
  try {
    if (!req.body.description && !req.body.name) return res.status(400).end();
    return db.task('get tweets from user', async task => {
      const queries = [];
      if (req.body.description)
        queries.push(
          updateDescription(task, req.user.id, req.body.description),
        );
      if (req.body.name)
        queries.push(updateName(task, req.user.id, req.body.name));
      await Promise.all(queries);
      return res.status(201).json({ status: `Success` });
    });
  } catch (err) {
    return res.status(500).end();
  }
}

const validate = celebrate({
  body: joi.object().keys({
    description: joi.string(),
    name: joi.string(),
  }),
});

router.put('/', loginRequired, validate, settings);

export default router;
