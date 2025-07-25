// import React from 'react';
// import '../styles/LoginNavbar.css';
// import { Link } from 'react-router-dom';
// // import universityLogo from '..src/pup.png'; // use your correct path
// import universityLogo from '../assets/pup.png';


// const LoginNavbar = () => {
//   return (
//     <nav className="login-navbar">
//       <div className="login-navbar-left">
//         <img src={universityLogo} alt="Punjabi University Logo" className="logo" />
//         <h2>Punjabi University Patiala</h2>
//       </div>
//       <div className="login-navbar-right">
//         <Link to="/About">About</Link>
//         <Link to="/contact">Contact</Link>
//         <Link to="/help">Help</Link>
//       </div>
//     </nav>
//   );
// };

// export default LoginNavbar;
import React from 'react';
import '../styles/LoginNavbar.css';
import { Link } from 'react-router-dom';
import universityLogo from '../assets/pup.png';

const LoginNavbar = () => {
  return (
    <nav className="login-navbar">
      <div className="login-navbar-left">
        <img src={universityLogo} alt="Punjabi University Logo" className="logo" />
        <h2>Punjabi University Patiala</h2>
      </div>
      <div className="login-navbar-right">
        {/* <Link to="#" onClick={() => alert("Punjabi University Exam Portal.\nDeveloped by Mavish Sethi.")}>
          About
        </Link> */}
        <Link to="#" onClick={() => alert("Contact us at:\nsupport@punjabiuniv.edu")}>
          Contact
        </Link>
        <Link to="#" onClick={() => alert("If you need any help, please contact your exam coordinator or visit the Help Desk. You can also email us at pupexam@gmail.com.")}>

          Help
        </Link>
      </div>
    </nav>
  );
};

export default LoginNavbar;

