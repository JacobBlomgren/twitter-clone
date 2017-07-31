import express from 'express';

import register from './register';
import checkAlreadyLoggedIn from './checkAlreadyLoggedIn';
import { authenticate, login } from './login';
import { loginRequired, logout } from './logout';

const router = express.Router();

router.post('/register', checkAlreadyLoggedIn, register);

router.post('/login', checkAlreadyLoggedIn, authenticate, login);

router.get('/logout', loginRequired, logout);

export default router;
