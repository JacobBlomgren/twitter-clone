import express from 'express';

import loginRequired from '../middleware/loginRequired';
import follow from './follow';
import unfollow from './unfollow';

const router = express.Router();

function validateUserID(req, res, next) {
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
router.use(validateUserID);
router.use(checkFollowYourself);

router.post('/', follow);
router.delete('/', unfollow);

export default router;
