// src/components/Footer.js
import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>&copy; {new Date().getFullYear()} Punjabi University Patiala | All rights reserved</p>

      <div className="footer-links">
        <a href="/">Privacy Policy</a>
        <a href="/">Terms of Use</a>
        <a href="/">Contact</a>
      </div>

      <p className="developer-tag">Developed by <strong>Mavish Sethi</strong></p>
    </footer>
  );
};

export default Footer;
