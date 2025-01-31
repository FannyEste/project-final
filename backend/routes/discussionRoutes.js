import express from "express";
import { Discussion } from "../models/Discussions.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all discussions (paginated)
router.get("/", async (req, res) => {
  const { page = 1, limit = 3 } = req.query;
  try {
    const discussions = await Discussion.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate("user", "name");

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

  try {
    const newDiscussion = new Discussion({
      topic,
      content,
      anonymous,
      user: req.user._id,
    });

    const savedDiscussion = await newDiscussion.save();
    res.status(201).json(savedDiscussion);
  } catch (error) {
    console.error("Error creating discussion:", error);
    res.status(500).json({ message: "Error creating discussion" });
  }
});

// Like or unlike a discussion
router.post("/:id/like", protect, async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) return res.status(404).json({ message: "Discussion not found" });

    if (!discussion.likedBy) discussion.likedBy = [];

    const userIndex = discussion.likedBy.indexOf(req.user._id.toString());

    if (userIndex === -1) {
      discussion.likedBy.push(req.user._id.toString());
      discussion.likes += 1;
    } else {
      discussion.likedBy.splice(userIndex, 1);
      discussion.likes -= 1;
    }

    await discussion.save();
    res.status(200).json({ likes: discussion.likes, likedBy: discussion.likedBy });
  } catch (error) {
    console.error("Error liking discussion:", error);
    res.status(500).json({ message: "Error liking discussion" });
  }
});

// Add a reply to a discussion
router.post("/:id/reply", protect, async (req, res) => {
  const { content } = req.body;

  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) return res.status(404).json({ message: "Discussion not found" });

    const reply = {
      content,
      name: req.user.name || "Anonymous",
      user: req.user._id,
    };

    discussion.replies.push(reply);
    await discussion.save();
    res.status(201).json(discussion);
  } catch (error) {
    console.error("Error adding reply:", error);
    res.status(500).json({ message: "Error adding reply" });
  }
});

// Delete a discussion (only if the user owns it)
router.delete("/:id", protect, async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) return res.status(404).json({ message: "Discussion not found" });

    console.log("Requesting user ID:", req.user._id); // ✅ Debugging
    console.log("Discussion owner ID:", discussion.user.toString()); // ✅ Debugging

    if (discussion.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to delete this discussion" });
    }

    await discussion.deleteOne();
    res.status(200).json({ message: "Discussion deleted successfully" });
  } catch (error) {
    console.error("Error deleting discussion:", error);
    res.status(500).json({ message: "Error deleting discussion" });
  }
});


// Delete a reply (only if the user owns it)
router.delete("/:discussionId/reply/:replyId", protect, async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.discussionId);
    if (!discussion) return res.status(404).json({ message: "Discussion not found" });

    const replyToDelete = discussion.replies.find(reply => reply._id.toString() === req.params.replyId);
    if (!replyToDelete) return res.status(404).json({ message: "Reply not found" });

    if (replyToDelete.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to delete this reply" });
    }

    // ✅ Use `$pull` to remove the reply from the database permanently
    await Discussion.findByIdAndUpdate(req.params.discussionId, {
      $pull: { replies: { _id: req.params.replyId } }
    });

    res.status(200).json({ message: "Reply deleted successfully" });
  } catch (error) {
    console.error("Error deleting reply:", error);
    res.status(500).json({ message: "Error deleting reply" });
  }
});


export default router;
