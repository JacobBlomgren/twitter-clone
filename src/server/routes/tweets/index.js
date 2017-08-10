import express from 'express';

import loginRequired from '../middleware/loginRequired';
import sanitize from '../middleware/sanitize';
import validateID from '../middleware/validateID';
import { addTweet, checkLength } from './addTweet';
import removeTweet from './removeTweet';

const router = express.Router();

router.use(loginRequired);

router.post('/', checkLength, sanitize(['content']), addTweet);
router.delete('/', validateID(['tweet_id']), removeTweet);

export default router;
