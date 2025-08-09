import Product from '../models/Product.js';
import Rental from '../models/Rental.js';
import User from '../models/user.js';

export const getDashboardSummary = async (req, res) => {
  try {

    const userId = req.user._id;

    // 🧮 Count user's own products
    const totalProducts = await Product.countDocuments({ createdBy: userId });

    // 🧮 Count rental requests for products owned by user
    const totalRentalRequests = await Rental.countDocuments({ ownerId: userId });

    // 🧮 Count rentals created *by* this user
    const myRentals = await Rental.countDocuments({ renterId: userId, status: 'approved' });

    res.status(200).json({
      totalProducts,
      totalRentalRequests,
      myRentals
    });

  } catch (err) {
    console.error("Dashboard summary error:", err);
    res.status(500).json({ msg: "Failed to fetch dashboard stats" });
  }
};

export const AdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const allRentals = await Rental.find({
  status: 'approved'  // ✅ only approved rentals
}).populate('productId');

// ✅ filter out rentals where the product no longer exists (i.e. was deleted)
const validRentals = allRentals.filter(rental => rental.productId);

const totalRentals = validRentals.length;

    
    res.json({ totalUsers, totalProducts, totalRentals });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};
