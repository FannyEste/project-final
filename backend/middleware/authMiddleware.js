import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Authenticated user:", req.user); // ✅ Debugging: Log user details
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};
