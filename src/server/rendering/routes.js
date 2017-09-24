import express from 'express';

import renderApp from '../../../lib/server/rendering/renderApp';
import loggedInUserID from '../routes/middleware/loggedInUserID';
import { profile } from './controller';

const router = express.Router();

router.get('/u/:username', loggedInUserID, async (req, res) => {
  try {
    const store = await profile(req.params.username, req.loggedInUserID);
    res.send(renderApp(req.url, store));
  } catch (err) {
    res.sendStatus(500);
  }
});

export default router;
