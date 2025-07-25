
import "../styles/TeacherHome.css";

import React from "react";
import { Outlet } from "react-router-dom";

import TeacherSidebar from "./TeacherSidebar";


const TeacherHome = () => {
  return (
    <div className="app-container">
      <div className="main-content">
        <TeacherSidebar />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;

