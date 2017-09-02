import express from 'express';

import auth from './auth';
import following from './following';
import like from './like';
import settings from './settings';
import tweets from './tweets';
import users from './users';
import joiError from './middleware/joiError';

const router = express.Router();

router.use('/auth', auth);
router.use('/following', following);
router.use('/like', like);
router.use('/settings', settings);
router.use('/tweets', tweets);
router.use('/users', users);

router.use(joiError);

export default router;
