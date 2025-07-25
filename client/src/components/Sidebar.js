

import React from "react";
import { NavLink ,useNavigate} from "react-router-dom";
import { FaChair, FaCalendarAlt, FaDownload, FaBook } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";


import '../styles/Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();


  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Student Panel</h2>
      <nav className="sidebar-nav">
        <NavLink to="/exam-seat" className="sidebar-link">
          <FaChair className="icon" /> Check Exam Seat
        </NavLink>
        <NavLink to="/datesheet" className="sidebar-link">
          <FaCalendarAlt className="icon" /> View Exam Datesheet
        </NavLink>
        <NavLink to="/admit-card" className="sidebar-link">
          <FaDownload className="icon" /> Download Admit Card
        </NavLink>
        <NavLink to="/guidelines" className="sidebar-link">
          <FaBook className="icon" /> Exam Guidelines
        </NavLink>
<li className="logout-option" onClick={() => navigate("/")}>
  <span className="icon"><FiLogOut /></span>
  Logout
</li>

      </nav>
    </div>
  );
};

export default Sidebar;
