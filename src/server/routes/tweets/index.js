import express from 'express';

import loginRequired from '../middleware/loginRequired';
import addTweet from './addTweet';
import removeTweet from './removeTweet';

const router = express.Router();

router.use(loginRequired);

router.post('/', addTweet);
router.delete('/', removeTweet);

export default router;
