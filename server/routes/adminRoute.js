import express from 'express';
import { getAllUsers, blockUser, unblockUser, deleteUser } from '../controllers/adminController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/users', authMiddleware.authMiddleware, authMiddleware.isAdmin, getAllUsers);
router.put('/users/block/:id', authMiddleware.authMiddleware, authMiddleware.isAdmin, blockUser);
router.put('/users/unblock/:id', authMiddleware.authMiddleware, authMiddleware.isAdmin, unblockUser);
router.delete('/users/:id', authMiddleware.authMiddleware, authMiddleware.isAdmin, deleteUser);

export default router;
