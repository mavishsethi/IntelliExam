
import React, { useState } from "react";
import axios from "axios";
import "../styles/DownloadAdmitCard.css";

const DownloadAdmitCard = () => {
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    applicationNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, id, applicationNumber } = formData;
    if (!name || !id || !applicationNumber) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      
      const response = await axios.post(
        " http://localhost:5000/api/admit-card/generate",
        formData,
        {
          responseType: "blob",
        }
      );
      
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      setPdfBlobUrl(url);
    } catch (error) {
      console.error("Error generating admit card:", error);
      alert("Failed to generate admit card.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!pdfBlobUrl) return;
    const a = document.createElement("a");
    a.href = pdfBlobUrl;
    a.download = "AdmitCard.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="admit-card-container">
      <h2>Download Admit Card</h2>
      <form className="admit-card-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="id"
          placeholder="Student ID / Roll No"
          value={formData.id}
          onChange={handleChange}
        />
        <input
          type="text"
          name="applicationNumber"
          placeholder="Application Number"
          value={formData.applicationNumber}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Admit Card"}
        </button>
      </form>

      {pdfBlobUrl && (
        <div className="admit-card-preview">
          <h3>Admit Card Ready</h3>
          <button onClick={handleDownload}>Download PDF</button>
        </div>
      )}
    </div>
  );
};

export default DownloadAdmitCard;
