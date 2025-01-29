import mongoose from "mongoose";

const discussionSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    anonymous: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference the User model
    },
    replies: [
      {
        content: { type: String, required: true },
        name: { type: String, default: "Anonymous" }, // Displayed name
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Track who made the reply
        createdAt: { type: Date, default: Date.now },
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Track users who liked
      },
    ],
  },
  { timestamps: true }
);

export const Discussion = mongoose.model("Discussion", discussionSchema);
