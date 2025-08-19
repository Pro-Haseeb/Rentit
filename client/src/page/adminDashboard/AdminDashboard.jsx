import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';
import API from "../../axiosConfig";

// 🔽 Import icons
import { FaUsers, FaBoxOpen, FaShoppingCart, FaBan, FaHeadset } from 'react-icons/fa';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalRentals: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("user"))?.token;

        const res = await API.get('/api/dashboard/admin/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <ul>
          <li><NavLink to="users" className="nav-link"><FaUsers /> Users</NavLink></li>
          <li><NavLink to="blocked-products" className="nav-link"><FaBan /> Blocked Products</NavLink></li>
          <li><NavLink to="all-products" className="nav-link"><FaBoxOpen /> All Products</NavLink></li>
          <li><NavLink to="all-rentals" className="nav-link"><FaShoppingCart /> All Rentals</NavLink></li>
          <li><NavLink to="admin-contact" className="nav-link"><FaHeadset /> Help Centre</NavLink></li>
        </ul>
      </div>

      {/* Main content */}
      <div className="admin-main">
        {/* Stats section */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <FaUsers className="stat-icon" />
            <h2>Total Users</h2>
            <p>{stats.totalUsers}</p>
          </div>
          <div className="stat-card">
            <FaBoxOpen className="stat-icon" />
            <h2>Total Products</h2>
            <p>{stats.totalProducts}</p>
          </div>
          <div className="stat-card">
            <FaShoppingCart className="stat-icon" />
            <h2>Total Rentals</h2>
            <p>{stats.totalRentals}</p>
          </div>
        </div>

        {/* Nested routes will appear here */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
