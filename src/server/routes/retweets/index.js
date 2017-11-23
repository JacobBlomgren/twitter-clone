import express from 'express';
import joi from 'joi';
import { celebrate } from 'celebrate';

import addRetweet from './addRetweet';
import removeRetweet from './removeRetweet';
import id from '../middleware/validation/id';
import loginRequired from '../middleware/loginRequired';

const router = express.Router();

const validate = celebrate({
  body: joi.object().keys({
    tweet_id: id.required(),
  }),
});

router.post('/', loginRequired, validate, addRetweet);
router.delete('/', loginRequired, validate, removeRetweet);

export default router;
