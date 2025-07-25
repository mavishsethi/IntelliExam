// import React, { useState } from "react";
// import "../styles/UploadSchedule.css";

// const UploadSchedule = () => {
//   const [examTitle, setExamTitle] = useState("");
//   const [examDate, setExamDate] = useState("");
//   const [file, setFile] = useState(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!examTitle || !examDate || !file) {
//       alert("Please fill all fields and upload a file.");
//       return;
//     }

//     console.log("Exam Title:", examTitle);
//     console.log("Exam Date:", examDate);
//     console.log("File Uploaded:", file.name);

//     // Add actual file upload logic (API call) here
//     alert("Schedule uploaded successfully!");
//     setExamTitle("");
//     setExamDate("");
//     setFile(null);
//   };

//   return (
//     <div className="upload-schedule-container">
//       <h2>Upload Exam Schedule</h2>
//       <form onSubmit={handleSubmit} className="upload-form">
//         <input
//           type="text"
//           placeholder="Exam Title (e.g., B.Tech Sem 3)"
//           value={examTitle}
//           onChange={(e) => setExamTitle(e.target.value)}
//           required
//         />

//         <input
//           type="date"
//           value={examDate}
//           onChange={(e) => setExamDate(e.target.value)}
//           required
//         />

//         <input
//           type="file"
//           accept=".pdf,.docx,.xlsx"
//           onChange={(e) => setFile(e.target.files[0])}
//           required
//         />

//         <button type="submit">Upload</button>
//       </form>
//     </div>
//   );
// };

// export default UploadSchedule;
import React, { useState } from "react";
// import axios from "axios";
import "../styles/UploadSchedule.css";

const UploadSchedule = () => {
  const [examTitle, setExamTitle] = useState("");
  const [examDate, setExamDate] = useState("");
  const [file, setFile] = useState(null);
  const [uploading] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!examTitle || !examDate || !file) {
  //     alert("Please fill all fields and upload a file.");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("examTitle", examTitle);
  //   formData.append("examDate", examDate);
  //   formData.append("file", file);

  //   const token = localStorage.getItem("token"); // JWT token

  //   try {
  //     setUploading(true);
  //     const response = await axios.post("/api/schedule/upload", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     alert("Schedule uploaded successfully!");
  //     setExamTitle("");
  //     setExamDate("");
  //     setFile(null);
  //   } catch (err) {
  //     console.error("Upload failed:", err);
  //     alert("Failed to upload schedule. Try again.");
  //   } finally {
  //     setUploading(false);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!examTitle || !examDate || !file) {
      alert("Please fill all fields and upload a file.");
      return;
    }
  
    const formData = new FormData();
    formData.append("title", examTitle);
    formData.append("date", examDate);
    formData.append("file", file);
  
    try {
      const res = await fetch("http://localhost:5000/api/schedule/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
  
      const data = await res.json();
      if (res.ok) {
        alert("Schedule uploaded successfully!");
        setExamTitle("");
        setExamDate("");
        setFile(null);
      } else {
        alert(data.message || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred.");
    }
  };
  
  return (
    <div className="upload-schedule-container">
      <h2>Upload Exam Schedule</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <input
          type="text"
          placeholder="Exam Title (e.g., B.Tech Sem 3)"
          value={examTitle}
          onChange={(e) => setExamTitle(e.target.value)}
          required
        />

        <input
          type="date"
          value={examDate}
          onChange={(e) => setExamDate(e.target.value)}
          required
        />

        <input
          type="file"
          accept=".pdf,.docx,.xlsx"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />

        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default UploadSchedule;

