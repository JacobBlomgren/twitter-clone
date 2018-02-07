import express from 'express';

import loggedInUserID from '../middleware/loggedInUserID';
import { searchUsers, validate as validateSearchUsers } from './users';

const router = express.Router();

router.get('/users', loggedInUserID, validateSearchUsers, searchUsers);

export default router;
