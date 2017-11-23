import express from 'express';
import joi from 'joi';
import { celebrate } from 'celebrate';

import id from '../middleware/validation/id';
import loginRequired from '../middleware/loginRequired';
import addLike from './addLike';
import removeLike from './removeLike';

const router = express.Router();

const validate = celebrate({
  body: joi.object().keys({
    tweet_id: id.required(),
  }),
});

router.use(loginRequired);
router.use(validate);

router.post('/', addLike);
router.delete('/', removeLike);

export default router;
