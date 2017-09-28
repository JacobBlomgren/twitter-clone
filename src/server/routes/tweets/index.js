import express from 'express';

import loginRequired from '../middleware/loginRequired';
import sanitize from '../middleware/sanitize';
import {
  addTweet,
  validate as validateAddTweet,
  checkLength,
} from './addTweet';
import { removeTweet, validate as validateRemoveTweet } from './removeTweet';

import loggedInUserID from '../middleware/loggedInUserID';
import { getTweet, validate as validateGetTweet } from './getTweet';

const router = express.Router();

router.get('/', validateGetTweet, loggedInUserID, getTweet);

router.post(
  '/',
  loginRequired,
  validateAddTweet,
  checkLength,
  sanitize(['content']),
  addTweet,
);
router.delete('/', loginRequired, validateRemoveTweet, removeTweet);

export default router;
