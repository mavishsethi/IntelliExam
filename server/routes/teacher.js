
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware"); // destructuring from exported object

router.get("/data", verifyToken, (req, res) => {
  if (req.user.role !== "teacher") {
    return res.status(403).json({ message: "Access denied. Only teachers allowed." });
  }

  res.status(200).json({ message: "Protected teacher data here." });
});

module.exports = router;
