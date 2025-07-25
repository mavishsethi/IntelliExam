
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaChair, FaCalendarAlt, FaDownload, FaFileAlt, FaUser } from "react-icons/fa";
import "../styles/StudentHome.css";

const StudentHome = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="student-dashboard">
      <div className="sidebar">
        <h2 className="sidebar-title">Student Dashboard</h2>
        <ul className="sidebar-menu">
          <li onClick={() => handleNavigate("/check-seat")}><FaChair /> Check Exam Seat</li>
          <li onClick={() => handleNavigate("/datesheet")}><FaCalendarAlt /> View Exam Datesheet</li>
          <li onClick={() => handleNavigate("/admit-card")}><FaDownload /> Download Admit Card</li>
          <li onClick={() => handleNavigate("/guidelines")}><FaFileAlt /> Exam Guidelines</li>
          <li onClick={() => handleNavigate("/profile")}><FaUser /> Profile</li>
          <li onClick={() => handleNavigate("/")}><FaSignOutAlt /> Logout</li>
        </ul>
      </div>
      <div className="main-content">
        <div className="navbar">
          <div className="user-info">
            <FaUserCircle className="user-icon" />
            <span className="user-name">Welcome, Student</span>
          </div>
        </div>
        <div className="welcome-text">
          <h1>Welcome to Your Exam Dashboard</h1>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;


