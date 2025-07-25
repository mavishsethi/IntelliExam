
import React, { useState } from "react";
import {
  FaThLarge,
  FaBell,
  FaQuestionCircle,
  FaUserCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  
  const handleProfileClick = () => {
        const role = localStorage.getItem("role");
        if (role === "teacher") {
          navigate("/teacher-home/profile"); //  stays in teacher panel
        } else {
          navigate("/profile"); // student profile
        }
      };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <FaThLarge className="navbar-icon" />
        <span className="navbar-title">Exam Portal</span>
      </div>

      <div className="navbar-right">
        <div
          className="navbar-option notification-wrapper"
          onClick={() => {
            setShowNotifications(!showNotifications);
            setShowHelp(false); 
          }}
        >
          <FaBell className="navbar-icon" />
          <span className="badge">3</span>
          <span>Notifications</span>
          {showNotifications && (
            <div className="dropdown">
              <p>Admit card is downloaded.</p>
              <p>Exam seating updated.</p>
              <p>New schedule uploaded.</p>
            </div>
          )}
        </div>

        <div
          className="navbar-option"
          onClick={() => {
            setShowHelp(!showHelp);
            setShowNotifications(false); 
          }}
        >
          <FaQuestionCircle className="navbar-icon" />
          <span>Help / Support</span>
          {showHelp && (
            <div className="dropdown">
              <p>Contact: support@punjabiuniv.edu</p>
              <p>Department assistance available.</p>
            </div>
          )}
        </div>

        <div className="navbar-option" onClick={handleProfileClick}>
          <FaUserCircle className="navbar-icon" />
          <span>Profile</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

