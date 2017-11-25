import express from 'express';
import loginRequired from '../middleware/loginRequired';
import loggedInUserID from '../middleware/loggedInUserID';
import getFollowers from '../../db/queries/user/followers';

const router = express.Router();

router.get('/', loginRequired, loggedInUserID, async (req, res) => {
  try {
    const response = await getFollowers(req.loggedInUserID);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).end();
  }
});

export default router;
