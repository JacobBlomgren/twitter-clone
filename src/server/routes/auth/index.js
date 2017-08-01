import express from 'express';

import register from './register';
import checkAlreadyLoggedIn from './checkAlreadyLoggedIn';
import { authenticate, login } from './login';
import logout from './logout';
import loginRequired from './loginRequired';

const router = express.Router();

router.post('/register', checkAlreadyLoggedIn, register);

router.post('/login', checkAlreadyLoggedIn, authenticate, login);

router.get('/logout', loginRequired, logout);

export default router;
