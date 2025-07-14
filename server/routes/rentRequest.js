import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

import {
  createRental,
  getOwnerRentals,
  updateRentalStatus,
  getMyRentals
} from "../controllers/rentController.js";

router.post("/", createRental); // Submit rental
router.get('/owner/:ownerId', getOwnerRentals); //Owner Dashboard rentals
router.put('/:id/status', updateRentalStatus); //Approve/Reject rental
router.get('/my', authMiddleware, getMyRentals); //My Rentals
export default router;
