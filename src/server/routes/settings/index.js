import express from 'express';

import { updateName, validate as validateName } from './name';
import {
  updateDescription,
  validate as validateDescription,
} from './description';
import loginRequired from '../middleware/loginRequired';

const router = express.Router();

router.put('/name', loginRequired, validateName, updateName);
router.put(
  '/description',
  loginRequired,
  validateDescription,
  updateDescription,
);

export default router;
