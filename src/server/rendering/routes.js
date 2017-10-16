import express from 'express';

import renderApp from '../../../lib/server/rendering/renderApp';
import loggedInUserID from '../routes/middleware/loggedInUserID';
import { profile, tweet } from './controller';

const router = express.Router();

router.use(loggedInUserID);

router.get('/u/:username', async (req, res) => {
  try {
    const store = await profile(req.params.username, req.loggedInUserID);
    res.send(renderApp(req.url, store));
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get('/t/:tweetID', async (req, res) => {
  try {
    const store = await tweet(req.params.tweetID, req.loggedInUserID);
    res.send(renderApp(req.url, store));
  } catch (err) {
    res.sendStatus(500);
  }
});

export default router;
