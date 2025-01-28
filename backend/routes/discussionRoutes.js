import express from "express";
import { Discussion } from "../models/Discussions.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all discussions (paginated)
router.get("/", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const discussions = await Discussion.find()
      .sort({ createdAt: -1 }) // Newest first
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const count = await Discussion.countDocuments();
    res.json({
      discussions,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error("Error fetching discussions:", error);
    res.status(500).json({ message: "Error fetching discussions" });
  }
});

// Create a new discussion
router.post("/", protect, async (req, res) => {
  const { topic, content, anonymous } = req.body;

  console.log("Received discussion creation request:", { topic, content, anonymous });

  try {

    // Log the user making the request
    console.log("User making the request:", req.user);

    // Log the discussion payload
    console.log("New discussion payload:", { topic, content, anonymous });
    
    const newDiscussion = new Discussion({
      topic,
      content,
      anonymous,
      user: req.user._id,
    });

    const savedDiscussion = await newDiscussion.save();
    console.log("Discussion saved:", savedDiscussion);
    res.status(201).json(savedDiscussion);
  } catch (error) {
    console.error("Error creating discussion:", error);
    res.status(500).json({ message: "Error creating discussion" });
  }
});

// Get a specific discussion with replies
router.get("/:id", async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id).populate(
      "user",
      "name"
    );
    if (!discussion) {
      return res.status(404).json({ message: "Discussion not found" });
    }
    res.json(discussion);
  } catch (error) {
    console.error("Error fetching discussion:", error);
    res.status(500).json({ message: "Error fetching discussion" });
  }
});

// Add a reply to a discussion
router.post("/:id/reply", protect, async (req, res) => {
  const { content } = req.body;

  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) {
      return res.status(404).json({ message: "Discussion not found" });
    }

    const reply = {
      content,
      name: req.user.name || "Anonymous",
    };

    discussion.replies.push(reply);
    const updatedDiscussion = await discussion.save();
    res.status(201).json(updatedDiscussion);
  } catch (error) {
    console.error("Error adding reply:", error);
    res.status(500).json({ message: "Error adding reply" });
  }
});

export default router;
