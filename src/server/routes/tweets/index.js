import express from 'express';

import loginRequired from '../middleware/loginRequired';
import {
  insertTweet as insertTweetQuery,
  removeTweet as removeTweetQuery,
} from '../../db/queries/tweet/index';

const router = express.Router();

router.use(loginRequired);

async function addTweet(req, res) {
  try {
    // First naive implementation
    if (req.body.content.length > 140) {
      res
        .status(400)
        .json({ error: 'Tweet cannot be larger than 140 characters' });
    }
    await insertTweetQuery(req.user.id, req.body.content);
    res.status(200).json({ status: 'Posted tweet' });
  } catch (err) {
    res.status(500).end();
  }
}

async function removeTweet(req, res) {
  try {
    const removed = await removeTweetQuery(req.body.tweet_id, req.user.id);
    if (removed === null) {
      res.status(404).json({
        error:
          'Tweet either does not exist or the user does not own the tweet and consequently cannot delete it',
      });
    }
    res.status(200).json({ status: 'Removed tweet' });
  } catch (err) {
    res.status(500).end();
  }
}

router.post('/', addTweet);
router.delete('/', removeTweet);

export default router;
