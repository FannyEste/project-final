import express from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Dashboard Route
router.get("/", protect, (req, res) => {
  res.json({
    message: "Welcome to your dashboard!",
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    },
  });
});

export default router;
