import express from 'express';

import { register, validate as validateRegister } from './register';
import checkAlreadyLoggedIn from '../middleware/checkAlreadyLoggedIn';
import { authenticate, login, validate as validateLogin } from './login';
import logout from './logout';
import loginRequired from '../middleware/loginRequired';
import usernameToLowerCase from './usernameToLowerCase';

const router = express.Router();

router.post(
  '/register',
  checkAlreadyLoggedIn,
  validateRegister,
  usernameToLowerCase,
  register,
);

router.post(
  '/login',
  checkAlreadyLoggedIn,
  validateLogin,
  authenticate,
  usernameToLowerCase,
  login,
);

router.get('/logout', loginRequired, logout);

export default router;
