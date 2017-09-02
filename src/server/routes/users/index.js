import express from 'express';
import joi from 'joi';
import celebrate from 'celebrate';

import id from '../middleware/validation/id';

import getTweets from './getTweets';
import getUser from './getUser';
import loggedInUserID from '../middleware/loggedInUserID';

const router = express.Router();

const validate = celebrate({
  params: joi.object().keys({
    userID: id.required(),
  }),
});

router.use(loggedInUserID);

router.get('/:userID/tweets', getTweets);
router.get('/:userID', getUser);

router.use(validate);

export default router;
