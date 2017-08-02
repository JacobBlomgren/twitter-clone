import express from 'express';

import register from './register';
import checkAlreadyLoggedIn from '../middleware/checkAlreadyLoggedIn';
import { authenticate, login } from './login';
import logout from './logout';
import loginRequired from '../middleware/loginRequired';

const router = express.Router();

router.post('/register', checkAlreadyLoggedIn, register);

router.post('/login', checkAlreadyLoggedIn, authenticate, login);

router.get('/logout', loginRequired, logout);

export default router;
