import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user", error });
  }
});

// Login a user and issue both access & refresh tokens
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    console.log("Login request received:", { email, password });

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate short-lived access token
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

    // Generate long-lived refresh token
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

    // Store refresh token in an HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,  // Set to true in production (HTTPS only)
      sameSite: "Strict",
    });

    res.status(200).json({ 
      accessToken, 
      user: { id: user._id, name: user.name, email: user.email } 
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

// Refresh token endpoint
router.get("/refresh-token", (req, res) => {
  const refreshToken = req.cookies.refreshToken; // Retrieve refresh token from cookie

  if (!refreshToken) {
    return res.status(401).json({ message: "Unauthorized - No refresh token" });
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden - Invalid refresh token" });
    }

    // Generate a new access token
    const newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "15m" });

    res.json({ accessToken: newAccessToken });
  });
});

// Get user profile (protected)
router.get("/profile", protect, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

// Update user profile (protected)
router.put("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { startDate, cycleLength, periodDuration } = req.body;

    // Update the user fields if they are provided
    if (startDate) user.startDate = startDate;
    if (cycleLength) user.cycleLength = cycleLength;
    if (periodDuration) user.periodDuration = periodDuration;

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        startDate: user.startDate,
        cycleLength: user.cycleLength,
        periodDuration: user.periodDuration,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

// Logout and clear refresh token
router.post("/logout", (req, res) => {
  res.clearCookie("refreshToken"); // Remove the refresh token
  res.status(200).json({ message: "Logged out successfully" });
});

export default router;
