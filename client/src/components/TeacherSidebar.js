// import React from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import '../styles/TeacherSidebar.css';
// import { FaTasks, FaChair, FaUpload, FaSignOutAlt } from 'react-icons/fa';

// const TeacherSidebar = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     navigate("/");
//   };

//   return (
//     <div className="teacher-sidebar">
//       <div className="sidebar-title">Teacher Panel</div>
//       <nav className="sidebar-nav">
//         <NavLink to="/view-duties" activeclassname="active">
//           <FaTasks className="sidebar-icon" />
//           Assigned Duties
//         </NavLink>
//         <NavLink to="/view-seating" activeclassname="active">
//           <FaChair className="sidebar-icon" />
//           Seating Arrangements
//         </NavLink>
//         <NavLink to="/upload-schedule" activeclassname="active">
//           <FaUpload className="sidebar-icon" />
//           Upload Schedule
//         </NavLink>
//         <div className="logout-link" onClick={handleLogout}>
//           <FaSignOutAlt className="sidebar-icon" />
//           Logout
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default TeacherSidebar;
import React from "react";
import { NavLink ,useNavigate} from "react-router-dom";
import "../styles/Sidebar.css";
import { FaTasks, FaChair, FaUpload } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";


const TeacherSidebar = () => {
  const navigate = useNavigate(); 
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Teacher Panel</h2>
      <nav className="sidebar-nav">
        <NavLink to="/teacher-home/view-duties" className="nav-link">
          <FaTasks className="sidebar-icon" /> Assigned Duties
        </NavLink>
        <NavLink to="/teacher-home/view-seating" className="nav-link">
          <FaChair className="sidebar-icon" /> View Seating
        </NavLink>
        <NavLink to="/teacher-home/upload-schedule" className="nav-link">
          <FaUpload className="sidebar-icon" /> Upload Schedule
        </NavLink>
        {/* <NavLink to="/" className="nav-link">
          <FaSignOutAlt className="logout-option" /> Logout
        </NavLink> */}
        <li className="logout-option" onClick={() => navigate("/")}>
          <span className="icon"><FiLogOut /></span>
          Logout
        </li>
      </nav>
    </div>
  );
};

export default TeacherSidebar;
