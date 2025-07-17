import Product from '../models/Product.js';
import Rental from '../models/Rental.js';

export const getDashboardSummary = async (req, res) => {
  try {

    const userId = req.user._id;

    // 🧮 Count user's own products
    const totalProducts = await Product.countDocuments({ createdBy: userId });

    // 🧮 Count rental requests for products owned by user
    const totalRentalRequests = await Rental.countDocuments({ ownerId: userId });

    // 🧮 Count rentals created *by* this user
    const myRentals = await Rental.countDocuments({ renterId: userId });

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
