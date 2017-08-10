import express from 'express';

import loginRequired from '../middleware/loginRequired';
import addTweet from './addTweet';
import validateID from '../middleware/validateID';
import removeTweet from './removeTweet';

const router = express.Router();

router.use(loginRequired);

router.post('/', addTweet);
router.delete('/', validateID(['tweet_id']), removeTweet);

export default router;
