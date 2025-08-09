// server/controllers/productController.js
import Product from '../models/Product.js';
import Rental from '../models/Rental.js';

// Add Product
const addProduct = async (req, res) => {   // ya api ha  add krnay ka lia
  // console.log("req.user:", req.user);
  try {
    // console.log("req.user:", req.user);
    const { title, description, category, price, hasOffer } = req.body;


    // multer se file aati hai req.file me
    const imagePath = req.file ? `/uploads/${req.file.filename}` : '';

    const newProduct = new Product({
      title,
      description,
      hasOffer,
      category,
      price,
      image: imagePath,     
      createdBy: req.user._id
    });

    await newProduct.save();

    res.status(201).json({
      msg: 'Product added successfully',
      product: newProduct
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Failed to add product', error });
  }
};


const getUserProducts = async (req, res) => {
  try {
    const userId = req.user._id;
    const products = await Product.find({ createdBy: userId })
     .populate("createdBy", "name email _id")
     .sort({ createdAt: -1 });
    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Failed to fetch user products', error });
  }
};

// Get All Products (  with filters)
const getAllProducts = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice } = req.query;
    let filter = {};

    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(filter)
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Failed to fetch products', error });
  }
};

// Get Only Products with Offers
const getOfferProducts = async (req, res) => {
  try {
    const products = await Product.find({ hasOffer: true }).sort({ createdAt: -1 });
    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Failed to fetch offer products', error });
  }
};

const blockProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, { isBlocked: true }, { new: true });
    res.status(200).json({ success: true, product: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: "Block failed", error: err.message });
  }
};

 const unblockProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, { isBlocked: false }, { new: true });
    res.status(200).json({ success: true, product: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: "Unblock failed", error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete failed", error: err.message });
  }
};

// Update Product

const updateProduct = async (req, res) => {
  try {
    const { title, price, category } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      console.log("Product not found with ID:", req.params.id);
      return res.status(404).json({ message: 'Product not found' });
    }

    // ✅ Ensure user is owner
    if (!product.createdBy?.toString || product.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // ✅ Check if product is currently rented
    const activeRental = await Rental.findOne({
      productId: product._id,
      status: 'active',
      endDate: { $gte: new Date() }
    });

    if (activeRental) {
      return res.status(400).json({ message: 'Product is currently rented and cannot be updated.' });
    }

    // ✅ Proceed with update
    if (title) product.title = title;
    if (price) product.price = price;
    if (category) product.category = category;

    await product.save();
    res.json({ message: 'Product updated successfully', product });
  } catch (err) {
    console.error('Update Product Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteOwnerProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // ✅ Ensure user owns the product
    if (product.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this product' });
    }

    // ✅ Check for active rental
    const activeRental = await Rental.findOne({
      productId: product._id,
      status: 'active',
      endDate: { $gte: new Date() } // today's date is before rental ends
    });

    if (activeRental) {
      return res.status(400).json({ message: 'Product is currently rented and cannot be deleted.' });
    }

    // ✅ Safe to delete
    await product.deleteOne();

    res.status(200).json({ message: 'Product deleted successfully' });

  } catch (error) {
    console.error('Delete Product Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};




export default { addProduct, getUserProducts, getAllProducts, getOfferProducts,updateProduct, deleteOwnerProduct, blockProduct, unblockProduct, deleteProduct };
