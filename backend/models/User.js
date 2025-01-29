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
  // Add cycle tracking fields
  phases: {
    menstrual: { type: [Date], default: [] },
    follicular: { type: [Date], default: [] },
    ovulatory: { type: [Date], default: [] },
    luteal: { type: [Date], default: [] }
  },
  startDate: { type: Date, default: null },
  periodDuration: { type: Number, default: 5 },
  cycleLength: { type: Number, default: 28 }
});

// Create the User model
export const User = mongoose.model("User", userSchema);
