// server/controllers/productController.js
import Product from '../models/Product.js';

// ➕ Add Product
const addProduct = async (req, res) => {
  try {
    const { title, description, category, price, image } = req.body;

    const newProduct = new Product({
      title,
      description,
      category,
      price,
      image,
      createdBy: req.user.id
    });

    await newProduct.save();
    res.status(201).json({ msg: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Failed to add product', error });
  }
};

const getUserProducts = async (req, res) => {
  try {
    const userId = req.user.id;
    const products = await Product.find({ createdBy: userId }).sort({ createdAt: -1 });
    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Failed to fetch user products', error });
  }
};

// 📄 Get All Products (with filters)
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

export default { addProduct, getUserProducts, getAllProducts };
