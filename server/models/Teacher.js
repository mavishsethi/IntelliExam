const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
//   rollNo: {
//     type: String,
//     required: true,
//     unique: true,
//   },
  profilePhoto: {
    type: String, // this stores the path or URL to the uploaded image
    default: "",  // optional default
  },
});

module.exports = mongoose.model("Teacher",teacherSchema);
