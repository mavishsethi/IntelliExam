
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "Student",
    profilePhoto: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);

  const studentId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/profile/student/${studentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data) {
          setProfile({
            name: res.data.name || "",
            email: res.data.email || "",
            role: "Student",
            profilePhoto: res.data.profilePhoto || "",
          });
        }
      } catch (err) {
        console.error("Error fetching profile", err);
      } finally {
        setLoading(false);
      }
    };

    if (studentId) fetchProfile();
  }, [studentId, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("email", profile.email);
    if (selectedFile) {
      formData.append("profilePhoto", selectedFile);
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/api/profile/student/${studentId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile({
        name: res.data.name || "",
        email: res.data.email || "",
        role: "Student",
        profilePhoto: res.data.profilePhoto || "",
      });
      setSelectedFile(null);
      alert("Profile updated successfully.");
    } catch (err) {
      console.error("Error updating profile", err);
      alert("Failed to update profile.");
    }
  };

  if (loading) return <div className="profile-container"><p>Loading Profile...</p></div>;

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-card">
        <div className="profile-picture">
          {/* <img
            src={
              selectedFile
                ? URL.createObjectURL(selectedFile)
                : profile.profilePhoto
                  ? profile.profilePhoto
                  : "https://via.placeholder.com/120"
            }
            alt="Profile"
            width={120}
            height={120}
          /> */}
          {/* <img
  src={
    selectedFile
      ? profile.profilePhoto
      : profile.profilePhoto
      ? `http://localhost:5000${profile.profilePhoto}`
      : "https://via.placeholder.com/120"
  }
  alt="Profile"
/> */}
{/* <img
  src={
    selectedFile
      ? URL.createObjectURL(selectedFile)
      : profile.profilePhoto || "https://www.inforwaves.com/media/2021/04/dummy-profile-pic-300x300-1.png"
  }
  alt="Profile"
// /> */}
<img
  src={
    selectedFile
      ? URL.createObjectURL(selectedFile)
      : profile.profilePhoto
      ? profile.profilePhoto.startsWith("http")
        ? profile.profilePhoto
        : `http://localhost:5000${profile.profilePhoto}`
      : "https://www.inforwaves.com/media/2021/04/dummy-profile-pic-300x300-1.png"
  }
  alt="Profile"
  width={120}
  height={120}
/>



          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <div className="profile-details">
          <label>
            Full Name:
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Role:
            <input type="text" value="Student" disabled />
          </label>

          <button className="save-btn" onClick={handleSave}>Save Changes</button>
          <button className="change-pass-btn">Change Password</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
