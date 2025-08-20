// src/components/Login.jsx
import React, { useState } from 'react';
// import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import API from "../axiosConfig";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const [isAdminLogin, setIsAdminLogin] = useState(false);
  // const [isShowModal, setIsShowModal] = useState(true);

  const handleChange = (e) => {
    setUser(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post('/api/auth/login', {
        ...user,
        isAdminLogin: isAdminLogin
      });

      const { token, user: userDataFromServer } = res.data;

      const userData = {
        ...userDataFromServer,
        token // ✅ Add token inside user object
      };

      // ✅ Store user object + token separately
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);

      console.log("Login Response", res.data);
      console.log("✅ Logged-in User:", userData);

      alert('Login successful!');

      // ✅ Redirect based on role
      if (userData.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }

    } catch (err) {
      console.error("Login Error", err.response?.data || err.message);
      if (err.message === "Request failed with status code 403")
        alert("User Blocked By Admin");
      else
        alert('Invalid credentials!');
    }
  };

  const handleAdminLoginClick = () => {
    setIsAdminLogin(true);
    // setIsShowModal(true);
  };

  const handleCloseModal = () => {
    setIsAdminLogin(false);
    // setIsShowModal(false);
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isAdminLogin ? "Admin Login" : "Login to Rentit"}</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
        />

        <button type="submit">{isAdminLogin ? "Login as Admin" : "Login"}</button>

        {!isAdminLogin && (
          <>
            <p className="auth-switch">
              Don't have an account? <a href="/signup">Register</a>
            </p>
            <p className="admin-link" onClick={handleAdminLoginClick}>
              Are you admin?
            </p>
          </>
        )}

        {isAdminLogin && (
          <p className="admin-back" onClick={handleCloseModal}>
            ← Back to user login
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
