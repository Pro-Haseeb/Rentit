import express from 'express';
import { createRentRequest } from '../controllers/rentRequestController.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, createRentRequest);

export default router;
