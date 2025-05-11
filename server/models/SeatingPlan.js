// models/SeatingPlan.js
// const mongoose = require("mongoose");

// const seatingPlanSchema = new mongoose.Schema({
//   examName: String,
//   date: Date,
//   time: String,
//   room: String,
//   seats: [
//     {
//       rollNo: String,
//       studentName: String,
//       seatNumber: String,
//     },
//   ],
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User", // the teacher
//   },
// });

// module.exports = mongoose.model("SeatingPlan", seatingPlanSchema);

// const mongoose = require("mongoose");

// const seatingPlanSchema = new mongoose.Schema({
//   room: { type: String, required: true },
//   date: { type: String, required: true },
//   timeSlot: { type: String, required: true },
//   students: [
//     {
//       studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//       seatNumber: { type: String, required: true },
//     },
//   ],
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("SeatingPlan", seatingPlanSchema);
const mongoose = require("mongoose");

const seatingPlanSchema = new mongoose.Schema({
  room: { type: String, required: true },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
  students: [
    {
      studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      seatNumber: { type: String, required: true },
    },
  ],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SeatingPlan", seatingPlanSchema);

