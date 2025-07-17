import Rental from "../models/Rental.js";

/**
  Create Rental Request (called when a user fills Rent Now form)
  POST /api/rentals
 */
export const createRental = async (req, res) => {
  try {
    console.log("RECEIVED productId:", req.body.productId);
console.log("RECEIVED ownerId:", req.body.ownerId);
console.log("RECEIVED renterId:", req.body.renterId);
    const rental = new Rental(req.body);
    await rental.save();
    res.status(201).json({ success: true, rental });
  } catch (err) {
    console.error("Rental creation failed:", err);
    res.status(500).json({
      success: false,
      message: "Rental creation failed",
      error: err.message,
    });
  }
};

/**
 * 📋 Get All Rentals for an Owner
 * GET /api/rentals/owner/:ownerId
 * Shows all rental requests for the owner's products
 */
export const getOwnerRentals = async (req, res) => {
  try {
     const ownerId = req.params.ownerId;
    console.log("🔍 ownerId received in route:", ownerId);
    if (!ownerId) {
      return res.status(400).json({ success: false, message: "ownerId is missing" });
    }
    const rentals = await Rental.find({ ownerId: req.params.ownerId })
      .populate("productId", "title image")
      .populate("renterId", "name email phone");

    res.status(200).json({ success: true, rentals });
  } catch (err) {
    console.error("Fetching rentals failed:", err);
    res.status(500).json({
      success: false,
      message: "Fetching rentals failed",
      error: err.message,
    });
  }
};

/**
 * ✅ Update Rental Status
 * PUT /api/rentals/:id/status
 * Body: { status: "approved" | "rejected" }
 */
export const updateRentalStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const updated = await Rental.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.status(200).json({ success: true, rental: updated });
  } catch (err) {
    console.error("Status update failed:", err);
    res.status(500).json({
      success: false,
      message: "Status update failed",
      error: err.message,
    });
  }
};


export const getMyRentals = async (req, res) => {
  try {
    const rentals = await Rental.find({ renterId: req.user?._id })
  
      .populate("productId");
    res.status(200).json({ rentals });
      console.log(req.user?._id);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch my rentals", error: err });
  }
};


export const deleteRental = async (req, res) => {try {
    await Rental.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: 'Rental deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to delete rental', error: err });
  }};
