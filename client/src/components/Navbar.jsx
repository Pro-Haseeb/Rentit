// src/components/Navbar.jsx
import React, { useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="logo">Rentit.pk</h1>
      </div>

      {/* ✅ Hamburger icon for mobile */}
      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✖' : '☰'}
      </div>

      {/* ✅ Toggleable mobile dropdown */}
      <div className={`navbar-right ${isOpen ? 'active' : ''}`}>
        <Link to="/" className="btn outline">Home</Link>
        <Link to="/explore" className="btn outline">Explore</Link>

        {user && (
          <>
            <Link to="/add-product" className="btn outline">Rent Out</Link>
            <Link to="/dashboard" className="btn outline">Dashboard</Link>
            <button className="btn outline" onClick={handleLogout}>Logout</button>
          </>
        )}

        {!user && (
          <>
            <Link to="/signup" className="btn1 outline">Register</Link>
            <Link to="/login" className="btn1 outline">Sign In</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
