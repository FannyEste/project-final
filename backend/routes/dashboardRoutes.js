import express from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Dashboard Route
router.get("/", protect, (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  // Send back the user's details
  res.json({
    name: req.user.name, // Get name from req.user
    email: req.user.email, // Get email from req.user
  });
});

export default router;
