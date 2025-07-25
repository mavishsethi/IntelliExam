
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import StudentHome from "./components/StudentHome";
import CheckExamSeat from "./components/CheckExamSeat";
import ViewDatesheet from "./components/ViewDatesheet";
import DownloadAdmitCard from "./components/DownloadAdmitCard";
import ExamGuidelines from "./components/ExamGuidelines";
import Profile from "./components/Profile";
import TeacherProfile from "./components/TeacherProfile";
import TeacherHome from "./components/TeacherHome";
// import Footer from "./components/Footer";
import ViewDuties from "./components/ViewDuties";
import ViewSeating from "./components/ViewSeating";
import UploadSchedule from "./components/UploadSchedule";


const Layout = () => {
  const location = useLocation();
  const hideLayout = location.pathname === "/";

  return (
    <div className="app-container">
      {!hideLayout && <Navbar />}
      <div className="main-content">
        {!hideLayout && <Sidebar />}
        <div className="page-content">
         
          <Routes>
  <Route path="/" element={<Login />} />
  <Route path="/student-home" element={<StudentHome />} />
  <Route path="/exam-seat" element={<CheckExamSeat />} />
  <Route path="/datesheet" element={<ViewDatesheet />} />
  <Route path="/admit-card" element={<DownloadAdmitCard />} />
  <Route path="/guidelines" element={<ExamGuidelines />} />
  <Route path="/profile" element={<Profile />} />

  {/* Teacher Panel with Nested Routes */}
  <Route path="/teacher-home" element={<TeacherHome />}>
    <Route path="view-duties" element={<ViewDuties />} />
    <Route path="view-seating" element={<ViewSeating />} />
    <Route path="upload-schedule" element={<UploadSchedule />} />
    <Route path="profile" element={<TeacherProfile />} /> 
  </Route>
</Routes>

          {/* <Footer></Footer> */}
        </div>
      </div>
    </div>
  );
};


function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
