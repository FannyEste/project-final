import mongoose from "mongoose";

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is required
  },
  email: {
    type: String,
    required: true, // Email is required
    unique: true, // Ensure email is unique
  },
  password: {
    type: String,
    required: true, // Password is required
  },
});

// Create the User model
export const User = mongoose.model("User", userSchema);
