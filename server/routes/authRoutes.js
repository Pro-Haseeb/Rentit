import express from 'express';
import {register , login} from '../controllers/authController.js';
// import authProtection from '../middleware/authMiddleware.js';
import upload from '../middleware/UploadMiddleWare.js';



const router = express.Router();

router.post('/register', upload.single('cnicImage'), register);
router.post('/login',  login);

export default router;