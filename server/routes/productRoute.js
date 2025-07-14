import express from 'express';
const router = express.Router();
import productController from '../controllers/productController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import upload from '../middleware/UploadMiddleWare.js'

// Protected Route - Add Product
router.post('/', authMiddleware ,upload.single('image'), productController.addProduct);
//my Products
router.get('/my', authMiddleware, productController.getUserProducts);
// Public Route - Get All Products
router.get('/', productController.getAllProducts);

router.get('/offers',  productController.getOfferProducts);

export default router;