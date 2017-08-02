import express from 'express';

import auth from './auth';
import following from './following';

const router = express.Router();

router.use('/auth', auth);
router.use('/following', following);

export default router;
