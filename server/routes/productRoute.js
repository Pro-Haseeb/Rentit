import express from 'express';
const router = express.Router();
import productController from '../controllers/productController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import upload from '../middleware/UploadMiddleWare.js'

// Protected Route - Add Product
router.post('/', authMiddleware.authMiddleware ,upload.single('image'), productController.addProduct);
//my Products
router.get('/my', authMiddleware.authMiddleware, productController.getUserProducts);
// Public Route - Get All Products
router.get('/', productController.getAllProducts);
// Offers
router.get('/offers',  productController.getOfferProducts);

// PUT block product
router.put("/admin/:id/block", productController.blockProduct);

// PUT unblock product
router.put("/admin/:id/unblock", productController.unblockProduct);

// DELETE product
router.delete("/admin/:id", productController.deleteProduct);

//Update Product
router.put('/update/:id',authMiddleware.authMiddleware, productController.updateProduct);

router.delete('/delete/:id', authMiddleware.authMiddleware, productController.deleteOwnerProduct);


export default router;