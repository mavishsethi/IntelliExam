
import React, { useState } from "react";
import "../styles/ViewDatesheet.css";

const ViewDatesheet = () => {
  const [formData, setFormData] = useState({
    className: "",
    semester: "",
    year: "",
  });

  const [schedules, setSchedules] = useState([]);
  const [datesheetVisible, setDatesheetVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setDatesheetVisible(false);

    try {
      const res = await fetch("http://localhost:5000/api/schedule/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setSchedules(data);
        setDatesheetVisible(true);
      } else {
        alert(data.message || "Failed to fetch schedule.");
      }
    } catch (err) {
      console.error("Error fetching schedule:", err);
      alert("Error occurred while fetching datesheet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="datesheet-container">
      <h2>View Exam Datesheet</h2>
      <form className="datesheet-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="className"
          placeholder="Class"
          value={formData.className}
          onChange={handleChange}
        />
        <input
          type="text"
          name="semester"
          placeholder="Semester"
          value={formData.semester}
          onChange={handleChange}
        />
        <input
          type="text"
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
        />
        <button type="submit">View Datesheet</button>
      </form>

      {loading && <p>Loading schedules...</p>}

      {datesheetVisible && schedules.length > 0 && (
        <div className="datesheet-display">
          <h3>Uploaded Exam Schedules</h3>
          <ul>
            {schedules.map((schedule) => (
              <li key={schedule._id} className="schedule-item">
                <strong>{schedule.title}</strong> ({schedule.date}) —{" "}
                <a
                  href={`http://localhost:5000${schedule.fileUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View File
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {datesheetVisible && schedules.length === 0 && !loading && (
        <p>No schedules available.</p>
      )}
    </div>
  );
};

export default ViewDatesheet;
