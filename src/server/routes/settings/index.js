import express from 'express';
import joi from 'joi';
import { celebrate } from 'celebrate';

import updateSettings from '../../db/queries/settings/index';

import loginRequired from '../middleware/loginRequired';
import loggedInUserID from '../middleware/loggedInUserID';

const router = express.Router();

async function settings(req, res) {
  try {
    if (!req.body.description && !req.body.name) return res.status(400).end();
    await updateSettings(req.loggedInUserID, req.body);
    return res.status(201).json({ status: `Success` });
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

router.put('/', loginRequired, loggedInUserID, validate, settings);

export default router;
