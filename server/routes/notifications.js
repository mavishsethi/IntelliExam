const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");
const { verifyToken, verifyTeacher } = require("../middleware/authMiddleware");

// POST: Add notification (Teacher only)
router.post("/", verifyToken, verifyTeacher, async (req, res) => {
  const { title, message } = req.body;
  try {
    const newNote = new Notification({ title, message, createdBy: req.user.id });
    await newNote.save();
    res.status(201).json({ message: "Notification posted." });
  } catch (err) {
    res.status(500).json({ error: "Failed to post notification." });
  }
});

// GET: All notifications (Accessible by students & teachers)
router.get("/", verifyToken, async (req, res) => {
  try {
    const notes = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch notifications." });
  }
});

module.exports = router;
