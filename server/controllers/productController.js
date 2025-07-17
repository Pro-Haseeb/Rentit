// server/controllers/productController.js
import Product from '../models/Product.js';

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

    const products = await Product.find(filter).sort({ createdAt: -1 });
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


export default { addProduct, getUserProducts, getAllProducts, getOfferProducts };
