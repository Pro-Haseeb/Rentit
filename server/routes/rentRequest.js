import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

import {
  createRental,
  getOwnerRentals,
  updateRentalStatus,
  getMyRentals,
  deleteRental,
  getAllRentalsAdmin
} from "../controllers/rentController.js";

router.post("/", createRental); // Submit rental
router.get('/owner/:ownerId', getOwnerRentals); //Owner Dashboard rentals
router.put('/:id/status', updateRentalStatus); //Approve/Reject rental
router.get('/my',authMiddleware.authMiddleware, getMyRentals); //My Rentals
router.delete('/:delete', deleteRental); //Delete rental
router.get("/all", authMiddleware.authMiddleware, getAllRentalsAdmin); // Admin - Get all rentals

export default router;
