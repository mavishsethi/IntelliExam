
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const User = require("../models/User"); // Shared User model

// Multer setup for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profile/"); // Ensure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

/* ------------------ STUDENT ROUTES ------------------ */

// GET student profile
router.get("/student/:id", async (req, res) => {
  try {
    const student = await User.findById(req.params.id);
    if (!student || student.role !== "student") {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    console.error("GET /student/:id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT/Update student profile
router.put("/student/:id", upload.single("profilePhoto"), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      email: req.body.email,
    };

    if (req.file) {
      updateData.profilePhoto = "/uploads/profile/" + req.file.filename;
    }

    const updatedStudent = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedStudent || updatedStudent.role !== "student") {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(updatedStudent);
  } catch (err) {
    console.error("PUT /student/:id error:", err);
    res.status(500).json({ message: "Profile update failed" });
  }
});

/* ------------------ TEACHER ROUTES ------------------ */

// GET teacher profile
router.get("/teacher/:id", async (req, res) => {
  try {
    const teacher = await User.findById(req.params.id);
    if (!teacher || teacher.role !== "teacher") {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json(teacher);
  } catch (err) {
    console.error("GET /teacher/:id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT/Update teacher profile
router.put("/teacher/:id", upload.single("profilePhoto"), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      email: req.body.email,
    };

    if (req.file) {
      updateData.profilePhoto = "/uploads/profile/" + req.file.filename;
    }

    const updatedTeacher = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedTeacher || updatedTeacher.role !== "teacher") {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.json(updatedTeacher);
  } catch (err) {
    console.error("PUT /teacher/:id error:", err);
    res.status(500).json({ message: "Profile update failed" });
  }
});

module.exports = router;
