// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Link, Outlet, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTachometerAlt, FaUsers, FaBoxOpen, FaBan, FaCog } from "react-icons/fa";
import {  FaClipboardList, FaShoppingCart } from "react-icons/fa";
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalRentalRequests: 0,
    myRentals: 0,
  });

  const location = useLocation();
  const isRootDashboard = location.pathname === '/dashboard';

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get('/api/dashboard/summary', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard summary:", err);
      }
    };

    if (isRootDashboard) {
      fetchDashboardStats();
    }
  }, [isRootDashboard]);

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <h2>Dashboard</h2>
       <nav>
  <NavLink to="" end className={({ isActive }) => isActive ? 'active' : ''}>
    <FaTachometerAlt style={{ marginRight: '8px' }} />
    Dashboard
  </NavLink>

  <NavLink to="owner-products" className={({ isActive }) => isActive ? 'active' : ''}>
    <FaBoxOpen style={{ marginRight: '8px' }} />
    My Products
  </NavLink>

  <NavLink to="rental-requests" className={({ isActive }) => isActive ? 'active' : ''}>
    <FaUsers style={{ marginRight: '8px' }} />
    Rental Requests
  </NavLink>

  <NavLink to="my-rentals" className={({ isActive }) => isActive ? 'active' : ''}>
    <FaTachometerAlt style={{ marginRight: '8px' }} />
    My Rentals
  </NavLink>

  <NavLink to="rental-history" className={({ isActive }) => isActive ? 'active' : ''}>
    <FaCog style={{ marginRight: '8px' }} />
    Rental History
  </NavLink>
</nav>

      </aside>

      <main className="dashboard-content">
        {/* 👇 Only show stats if user is on /dashboard root */}
        {isRootDashboard && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="welcome-box"
          >
            <h1>Welcome to your Dashboard 👋</h1>
            <p>Manage your products, rental requests, and history all in one place.</p>

           <div className="stats-boxes">
  <motion.div className="stat-card" whileHover={{ scale: 1.05 }}>
    <FaBoxOpen className="stat-icon" style={{ color: '#2563eb' }} />
    <h3>{stats.totalProducts}</h3>
    <p><strong>Products Listed</strong></p>
  </motion.div>

  <motion.div className="stat-card" whileHover={{ scale: 1.05 }}>
    <FaShoppingCart className="stat-icon" style={{ color: '#16a34a' }} />
    <h3>{stats.myRentals}</h3>
    <p><strong>Active Rentals</strong></p>
  </motion.div>

  <motion.div className="stat-card" whileHover={{ scale: 1.05 }}>
    <FaClipboardList className="stat-icon" style={{ color: '#f59e0b' }} />
    <h3>{stats.totalRentalRequests}</h3>
    <p><strong>Total Requests</strong></p>
  </motion.div>
</div>

          </motion.div>
        )}

        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
