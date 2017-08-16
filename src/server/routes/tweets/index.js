import express from 'express';

import loginRequired from '../middleware/loginRequired';
import sanitize from '../middleware/sanitize';
import {
  addTweet,
  validate as validateAddTweet,
  checkLength,
} from './addTweet';
import { removeTweet, validate as validateRemoveTweet } from './removeTweet';

const router = express.Router();

router.use(loginRequired);

router.post(
  '/',
  validateAddTweet,
  checkLength,
  sanitize(['content']),
  addTweet,
);
router.delete('/', validateRemoveTweet, removeTweet);

export default router;
