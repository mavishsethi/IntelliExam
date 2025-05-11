// const mongoose = require("mongoose");

// const studentSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   rollNo: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   profilePhoto: {
//     type: String, // this stores the path or URL to the uploaded image
//     default: "",  // optional default
//   },
// });

// module.exports = mongoose.model("Student", studentSchema);
// const mongoose = require("mongoose");

// const studentSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   rollNo: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   profilePhoto: {
//     type: String,
//     default: "",
//   },
// }, {
//   collection: "students", //  explicitly point to the correct collection
// });

// module.exports = mongoose.model("Student", studentSchema);
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  rollNo: {
    type: String, // required only for students
  },
  employeeId: {
    type: String, // required only for teachers
  },
  role: {
    type: String,
    enum: ["student", "teacher"],
    required: true,
  },
  profilePhoto: {
    type: String,
    default: "",
  },
}, {
  collection: "users", // use shared 'users' collection
});

// module.exports = mongoose.model("User", userSchema);
module.exports = mongoose.models.User || mongoose.model("User", userSchema);

