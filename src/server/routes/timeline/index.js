import express from 'express';

import loggedInUserID from '../middleware/loggedInUserID';
import loginRequired from '../middleware/loginRequired';
import getTimeLineQuery from '../../db/queries/timeline';

const router = express.Router();

async function getTimeLine(req, res) {
  try {
    const response = await getTimeLineQuery(req.loggedInUserID);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).end();
  }
}

router.get('/', loginRequired, loggedInUserID, getTimeLine);

export default router;
