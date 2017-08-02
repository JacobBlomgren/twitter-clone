import express from 'express';

import loginRequired from '../middleware/loginRequired';
import {
  follow as followQuery,
  unfollow as unfollowQuery,
} from '../../db/queries/follow';

const router = express.Router();

function parseUserID(req, res, next) {
  if (isNaN(parseInt(req.body.user_id, 10))) {
    res
      .status(400)
      .json({ error: 'Incorrect format. user_id must be an integer.' });
  }
  next();
}

function checkFollowYourself(req, res, next) {
  if (req.body.user_id === req.user.id)
    res.status(400).json({ error: 'A user cannot follow itself.' });
  next();
}

router.use(loginRequired);
router.use(parseUserID);
router.use(checkFollowYourself);

async function follow(req, res) {
  try {
    await followQuery(req.user.id, req.body.user_id);
    res.status(200).json({ status: `Followed ${req.body.user_id}` });
  } catch (err) {
    res.status(500).end();
  }
}

async function unfollow(req, res) {
  try {
    await unfollowQuery(req.user.id, req.body.user_id);
    res.status(204).json({ status: `Unfollowed ${req.body.user_id}` });
  } catch (err) {
    res.status(500).end();
  }
}

router.post('/', follow);
router.delete('/', unfollow);

export default router;
