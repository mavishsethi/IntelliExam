import React from "react";
import "../styles/ExamGuidelines.css";

const ExamGuidelines = () => {
  const guidelines = [
    "Reach the exam center 30 minutes before the scheduled time.",
    "Carry your admit card and a valid photo ID.",
    "Use of mobile phones and electronic gadgets is strictly prohibited.",
    "Do not carry any written material or notes inside the exam hall.",
    "Follow instructions given by the invigilators at all times.",
    "Maintain silence in the exam hall.",
    "Attempt all questions carefully and manage your time wisely.",
    "Cheating or misconduct will lead to disqualification.",
  ];

  return (
    <div className="guidelines-container">
      <h2>Exam Guidelines</h2>
      <ul>
        {guidelines.map((rule, index) => (
          <li key={index}>{rule}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExamGuidelines;
