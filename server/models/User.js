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
  role: {
    type: String,
    enum: ["student", "teacher"],
    required: true,
  },
  rollNo: {
    type: String,
    required: function () {
      return this.role === "student";
    },
  },
  password: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String, 
    default: "",  
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
