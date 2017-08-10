import express from 'express';

import loginRequired from '../middleware/loginRequired';
import validateID from '../middleware/validateID';
import follow from './follow';
import unfollow from './unfollow';

const router = express.Router();

function checkFollowYourself(req, res, next) {
  if (req.body.user_id === req.user.id)
    res.status(400).json({ error: 'A user cannot follow itself.' });
  next();
}

router.use(loginRequired);
router.use(validateID(['user_id']));
router.use(checkFollowYourself);

router.post('/', follow);
router.delete('/', unfollow);

export default router;
