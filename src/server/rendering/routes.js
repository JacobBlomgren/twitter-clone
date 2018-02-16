import express from 'express';

import renderApp from '../../../lib/server/rendering/renderApp';
import loggedInUserID from '../routes/middleware/loggedInUserID';
import {
  compose,
  login,
  profile,
  settings,
  timeline,
  tweet,
} from './controller';

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

router.get('/settings', async (req, res) => {
  try {
    const store = await settings(req.loggedInUserID);
    res.send(renderApp(req.url, store));
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get('/login', async (req, res) => {
  try {
    const store = await login(req.loggedInUserID);
    res.send(renderApp(req.url, store));
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get('/compose', async (req, res) => {
  try {
    const store = await compose(req.loggedInUserID);
    res.send(renderApp(req.url, store));
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get('/', async (req, res) => {
  try {
    if (req.loggedInUserID) {
      const store = await timeline(req.loggedInUserID);
      res.send(renderApp(req.url, store));
    }
  } catch (err) {
    res.sendStatus(500);
  }
});

export default router;
