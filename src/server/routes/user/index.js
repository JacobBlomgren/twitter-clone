import express from 'express';

import { getUser, validate } from './getUser';
import loggedInUserID from '../middleware/loggedInUserID';

const router = express.Router();

router.use(loggedInUserID);

router.get('/', validate, getUser);

export default router;
