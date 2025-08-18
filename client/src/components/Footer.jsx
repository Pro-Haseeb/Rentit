// src/components/Footer.jsx
import React from 'react';
import './Footer.css';
import { FaPhoneAlt, FaEnvelope, FaInfoCircle, FaLock, FaGavel } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Rentit.pk</h3>
          <p>Smart rental platform to rent anything, anytime.</p>
        </div>

       <div className="footer-section">
  <h4>Quick Links</h4>
  <ul>
    <li><Link to="/about"><FaInfoCircle style={{ marginRight: '8px' }} />About Us</Link></li>
    <li><Link to="/terms"><FaGavel style={{ marginRight: '8px' }} />Terms & Conditions</Link></li>
    <li><Link to="/privacy"><FaLock style={{ marginRight: '8px' }} />Privacy Policy</Link></li>
  </ul>
</div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p><FaEnvelope style={{ marginRight: '8px' }} /> rentit83@gmail.com</p>
          <p><FaPhoneAlt style={{ marginRight: '8px' }} /> +92-300-1234567</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Rentit.pk. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
