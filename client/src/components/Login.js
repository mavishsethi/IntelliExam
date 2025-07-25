
import "../styles/Login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginNavbar from "./LoginNavbar";
// import Footer from "./Footer";

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNo: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleClick = (selectedRole) => {
    setRole(selectedRole);
    setFormData({
      name: "",
      email: "",
      rollNo: "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const { name, email, rollNo, password } = formData;

    if (!name || !email || !password || (role === "student" && !rollNo)) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, role }),
      });
      

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", role);
        localStorage.setItem("userId", data.user.id); 

        if (role === "student") {
          navigate("/exam-seat");
        } else {
          navigate("/teacher-home/view-duties");
        }
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong during login.");
    }
  };

  return (
    <>
      <LoginNavbar />
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="tab-switch">
            <button
              type="button"
              className={role === "student" ? "active" : ""}
              onClick={() => handleRoleClick("student")}
            >
              Student
            </button>
            <button
              type="button"
              className={role === "teacher" ? "active" : ""}
              onClick={() => handleRoleClick("teacher")}
            >
              Teacher
            </button>
          </div>

          <h2>{role === "student" ? "Student Login" : "Teacher Login"}</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="University Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {role === "student" && (
            <input
              type="text"
              name="rollNo"
              placeholder="Roll Number"
              value={formData.rollNo}
              onChange={handleChange}
            />
          )}

          <button type="submit">Login</button>
        </form>
       {/* <Footer></Footer> */}
      </div>
    </>
  );
};

export default Login;
