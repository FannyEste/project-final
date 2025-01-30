import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { User } from "../models/User.js"; // Import User model

const router = express.Router();

// ✅ Get User Data (Including Cycle Data)
router.get("/", protect, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const user = await User.findById(req.user.id).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      name: user.name,
      email: user.email,
      startDate: user.startDate,
      periodDuration: user.periodDuration,
      cycleLength: user.cycleLength,
      phases: user.phases
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//  User's Cycle Data
router.put("/update-cycle", protect, async (req, res) => {
  try {
    const { phases, startDate, periodDuration, cycleLength } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user's cycle data
    user.phases = phases;
    user.startDate = startDate;
    user.periodDuration = periodDuration;
    user.cycleLength = cycleLength;

    await user.save();

    res.json({ message: "Cycle data updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to update cycle data" });
  }
});

export default router;
