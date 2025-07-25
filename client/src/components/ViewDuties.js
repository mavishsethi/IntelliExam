import React, { useState } from "react";
import "../styles/ViewDuties.css";

const ViewDuties = () => {
  const [email, setEmail] = useState("");
  const [duties, setDuties] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy duty data – replace with real API call
    const dummyDuties = [
      {
        date: "2025-04-10",
        time: "9:00 AM - 12:00 PM",
        room: "B101",
        exam: "B.Tech Cse Sem 4",
      },
      {
        date: "2025-04-12",
        time: "2:00 PM - 5:00 PM",
        room: "C202",
        exam: "B.Tech ecm Sem 2",
      },
    ];

    setDuties(dummyDuties);
  };

  return (
    <div className="duties-container">
      <h2>View Assigned Duties</h2>
      <form onSubmit={handleSubmit} className="duty-form">
        <input
          type="email"
          placeholder="Enter University Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Check Duties</button>
      </form>

      {duties.length > 0 && (
        <table className="duty-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Room</th>
              <th>Exam</th>
            </tr>
          </thead>
          <tbody>
            {duties.map((duty, index) => (
              <tr key={index}>
                <td>{duty.date}</td>
                <td>{duty.time}</td>
                <td>{duty.room}</td>
                <td>{duty.exam}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewDuties;
