import express from 'express';
import  authMiddleware  from '../middleware/authMiddleware.js';

import Tutorial from '../controllers/tutorialController.js';

const router = express.Router();
router.put('/', authMiddleware.authMiddleware, Tutorial);

export default router;