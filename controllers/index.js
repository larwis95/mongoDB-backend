/* eslint-disable import/extensions */
import express from 'express';
import userApi from './user-api.js';
import thoughtApi from './thought-api.js';

const router = express.Router();

router.use('/users', userApi);
router.use('/thoughts', thoughtApi);

export default router;
