
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const authRoutes = require("./routes/auth");
const seatingRoutes = require("./routes/seating");
const teacherRoutes = require("./routes/teacher");
const scheduleRoutes = require("./routes/schedule");
const admitCardRoutes = require("./routes/admitCard");
const notificationRoutes = require("./routes/notifications");
const profileRoutes = require("./routes/profile");

const app = express();

// Middleware
app.use(cors());

//  Only apply to routes that expect JSON (not file uploads)
app.use("/api/auth", express.json(), authRoutes);
app.use("/api/seating", express.json(), seatingRoutes);
app.use("/api/teacher", express.json(), teacherRoutes);
app.use("/api/schedule", express.json(), scheduleRoutes);
app.use("/api/admit-card", express.json(), admitCardRoutes);
app.use("/api/notifications", express.json(), notificationRoutes);


app.use("/api/profile", profileRoutes);

//  Static file serving
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static("uploads"));

//  MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

//  Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
