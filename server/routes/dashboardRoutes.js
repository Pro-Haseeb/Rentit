import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getDashboardSummary, AdminDashboard } from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/summary',authMiddleware.authMiddleware,  getDashboardSummary);
router.get('/admin/stats', authMiddleware.authMiddleware, AdminDashboard);

export default router;
