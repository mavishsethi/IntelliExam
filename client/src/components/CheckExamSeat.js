
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/CheckExamSeat.css";

const CheckExamSeat = () => {
  const [seatInfo, setSeatInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSeatInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
          setError("Missing authentication data.");
          setLoading(false);
          return;
        }

       
        const res = await axios.get(`http://localhost:5000/api/seating/student/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        

        setSeatInfo(res.data);
      } catch (err) {
        console.error("Error fetching seat info:", err);
        setError("Unable to fetch seating information.");
      } finally {
        setLoading(false);
      }
    };

    fetchSeatInfo();
  }, []);

  return (
    <div className="seat-container">
      <h2>Check Your Exam Seat</h2>
      {loading ? (
        <p>Loading your seat information...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : seatInfo ? (
        <div className="seat-details">
          <p><strong>Name:</strong> {seatInfo.studentName}</p>
          <p><strong>Roll No:</strong> {seatInfo.rollNo}</p>
          <p><strong>Exam Room:</strong> {seatInfo.examRoom}</p>
          <p><strong>Date:</strong> {new Date(seatInfo.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {seatInfo.timeSlot}</p>
          <p><strong>Seat Number:</strong> {seatInfo.seatNumber}</p>
        </div>
      ) : (
        <p>No seat assignment found.</p>
      )}
    </div>
  );
};

export default CheckExamSeat;
