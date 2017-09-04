import express from 'express';

import auth from './auth';
import following from './following';
import like from './likes';
import retweets from './retweets';
import settings from './settings';
import tweets from './tweets';
import users from './users';
import joiError from './middleware/joiError';

const router = express.Router();

router.use('/auth', auth);
router.use('/following', following);
router.use('/likes', like);
router.use('/retweets', retweets);
router.use('/settings', settings);
router.use('/tweets', tweets);
router.use('/users', users);

router.use(joiError);

export default router;
