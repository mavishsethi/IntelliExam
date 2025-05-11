
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const ExamSchedule = require("../models/ExamSchedule");
const { verifyToken } = require("../middleware/authMiddleware"); // Destructuring import

//  Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

//  POST: Upload schedule (teacher only)
router.post(
  "/upload",
  verifyToken,
  upload.single("file"),
  async (req, res) => {
    try {
      if (req.user.role !== "teacher") {
        return res.status(403).json({ message: "Only teachers can upload schedules" });
      }

      const { title, date } = req.body;

      const newSchedule = new ExamSchedule({
        title,
        date,
        fileUrl: `/uploads/${req.file.filename}`,
        uploadedBy: req.user.id,
      });

      await newSchedule.save();
      res.status(201).json({ message: "Schedule uploaded", schedule: newSchedule });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
);

// GET: View all schedules
router.get("/all", verifyToken, async (req, res) => {
  try {
    const schedules = await ExamSchedule.find().sort({ createdAt: -1 });
    res.status(200).json(schedules);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;

