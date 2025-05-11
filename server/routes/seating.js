

const express = require("express");
const router = express.Router();
const SeatingPlan = require("../models/SeatingPlan");
const User = require("../models/User");
// const verifyToken = require("../middleware/authMiddleware");
const { verifyToken } = require("../middleware/authMiddleware");


//  1. Create seating plan (Only for teachers)
router.post("/create", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can create seating plans" });
    }

    const { room, date, timeSlot, students } = req.body;

    const newPlan = new SeatingPlan({
      room,
      date,
      timeSlot,
      students,
      createdBy: req.user.id,
    });

    await newPlan.save();
    res.status(201).json({ message: "Seating plan created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

//  2. Get seating info for a student by ID (general purpose - any role)
router.get("/:studentId", verifyToken, async (req, res) => {
  try {
    const studentId = req.params.studentId;

    const plan = await SeatingPlan.findOne({ "students.studentId": studentId })
      .populate("students.studentId", "name email rollNo")
      .populate("createdBy", "name email");

    if (!plan) {
      return res.status(404).json({ message: "Seating info not found for this student." });
    }

    const studentSeat = plan.students.find(
      (s) => s.studentId._id.toString() === studentId
    );

    res.status(200).json({
      exam: {
        room: plan.room,
        date: plan.date,
        timeSlot: plan.timeSlot,
      },
      seatNumber: studentSeat?.seatNumber,
      student: studentSeat?.studentId,
      invigilator: plan.createdBy,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// 3. Get seating info for logged-in student (restricted to student role)
router.get("/student/:id", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Access denied. Only students allowed." });
    }

    const studentId = req.params.id;

    const plan = await SeatingPlan.findOne({ "students.studentId": studentId })
      .populate("students.studentId", "name rollNo email")
      .lean();

    if (!plan) {
      return res.status(404).json({ message: "No seating plan found for this student" });
    }

    const studentEntry = plan.students.find(s => s.studentId._id.toString() === studentId);

    res.status(200).json({
      examRoom: plan.room,
      date: plan.date,
      timeSlot: plan.timeSlot,
      seatNumber: studentEntry.seatNumber,
      studentName: studentEntry.studentId.name,
      rollNo: studentEntry.studentId.rollNo,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
//  4. Assign student to seating plan (Only for teachers)
router.post("/assign", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can assign seating" });
    }

    const { studentId, rollNo, seatNumber, exam, room, date, timeSlot } = req.body;

    let plan = await SeatingPlan.findOne({ room, date, timeSlot });

    if (!plan) {
      return res.status(404).json({ message: "Seating plan not found for given room, date, and time." });
    }

    // Avoid duplicate assignment
    const alreadyAssigned = plan.students.find(
      (s) => s.studentId.toString() === studentId
    );
    if (alreadyAssigned) {
      return res.status(400).json({ message: "Student already assigned to this plan." });
    }

    plan.students.push({ studentId, rollNo, seatNumber, exam });
    await plan.save();

    res.status(200).json({ message: "Student seating assigned successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;