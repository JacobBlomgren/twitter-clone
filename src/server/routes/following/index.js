import express from 'express';
import joi from 'joi';
import { celebrate } from 'celebrate';

import loginRequired from '../middleware/loginRequired';
import id from '../middleware/validation/id';
import follow from './follow';
import unfollow from './unfollow';

const router = express.Router();

function checkFollowYourself(req, res, next) {
  if (req.body.user_id === req.user.id)
    res.status(400).json({ error: 'A user cannot follow itself.' });
  next();
}

const validate = celebrate({
  body: joi.object().keys({
    user_id: id.required(),
  }),
});

router.use(loginRequired);
router.use(validate);
router.use(checkFollowYourself);

router.post('/', follow);
router.delete('/', unfollow);

export default router;
