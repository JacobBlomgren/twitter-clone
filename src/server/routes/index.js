import express from 'express';
import bodyParser from 'body-parser';

import auth from './auth';
import followers from './followers';
import following from './following';
import like from './likes';
import retweets from './retweets';
import settings from './settings';
import tweets from './tweets';
import user from './user';
import joiError from './middleware/joiError';

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.use('/auth', auth);
router.use('/followers', followers);
router.use('/following', following);
router.use('/likes', like);
router.use('/retweets', retweets);
router.use('/settings', settings);
router.use('/tweets', tweets);
router.use('/user', user);

router.use(joiError);

export default router;
