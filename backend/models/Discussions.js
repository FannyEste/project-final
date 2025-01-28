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
        content: String,
        name: String, // Anonymous or user-provided name
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Discussion = mongoose.model("Discussion", discussionSchema);
