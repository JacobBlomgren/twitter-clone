import express from 'express';

import auth from './auth';
import following from './following';
import tweets from './tweets';

const router = express.Router();

router.use('/auth', auth);
router.use('/following', following);
router.use('/tweets', tweets);

export default router;
