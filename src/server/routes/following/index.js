import express from 'express';

import loginRequired from '../middleware/loginRequired';
import follow from './follow';
import unfollow from './unfollow';

const router = express.Router();

function validateUserID(req, res, next) {
  const id = req.body.user_id;
  if (isNaN(parseInt(id, 10)) || id <= 1) {
    res
      .status(400)
      .json({ error: 'Incorrect format. user_id must be a strictly positive integer.' });
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
