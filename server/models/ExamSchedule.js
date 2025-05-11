
const mongoose = require("mongoose");

const examScheduleSchema = new mongoose.Schema({
  title: String,
  date: String,
  fileUrl: String,
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ExamSchedule", examScheduleSchema);

