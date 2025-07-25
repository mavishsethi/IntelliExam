import React, { useState } from "react";
import "../styles/ViewSeating.css";

const ViewSeating = () => {
  const [formData, setFormData] = useState({
    className: "",
    examDate: "",
  });

  const [seatingData, setSeatingData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy data – in a real app, you'd fetch from backend
    const dummySeating = [
      { studentName: "Ankit Sharma", rollNo: "101", room: "A1", seat: "12" },
      { studentName: "Priya Mehta", rollNo: "102", room: "A1", seat: "13" },
      { studentName: "Ravi Kumar", rollNo: "103", room: "A1", seat: "14" },
    ];

    setSeatingData(dummySeating);
  };

  return (
    <div className="view-seating-container">
      <h2>View Seating Arrangements</h2>
      <form onSubmit={handleSubmit} className="seating-form">
        <input
          type="text"
          name="className"
          placeholder="Enter Class"
          value={formData.className}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="examDate"
          value={formData.examDate}
          onChange={handleChange}
          required
        />
        <button type="submit">View Seating</button>
      </form>

      {seatingData.length > 0 && (
        <table className="seating-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Roll Number</th>
              <th>Room</th>
              <th>Seat</th>
            </tr>
          </thead>
          <tbody>
            {seatingData.map((student, index) => (
              <tr key={index}>
                <td>{student.studentName}</td>
                <td>{student.rollNo}</td>
                <td>{student.room}</td>
                <td>{student.seat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewSeating;
