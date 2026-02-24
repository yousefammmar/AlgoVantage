import express from 'express';
import { getProfile, getRatingHistory, getStatus, getAllUserData } from '../controllers/api.controller.js';

const router = express.Router();

router.get('/user/:handle/profile', getProfile);
router.get('/user/:handle/rating', getRatingHistory);
router.get('/user/:handle/status', getStatus);
router.get('/user/:handle/all', getAllUserData);

export default router;
