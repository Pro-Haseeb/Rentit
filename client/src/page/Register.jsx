import React, { useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // 📁 Styling file link
import API from "../axiosConfig";
const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    city: '',
    phone: ''
  });

  const [agreed, setAgreed] = useState(false);

  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('city', user.city);
    formData.append('phone', user.phone);
    if (image) {
      formData.append('cnicImage', image); // Must match backend multer field name
    }

    try {
      const res = await API.post('/api/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert(res.data.msg || "Registration successful");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.msg || 'Registration failed');
    }
  };


  return (
    <div className="auth-wrapper">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create an Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={user.name}
          onChange={handleChange}
          required
        />

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

        <input
          type="text"
          name="city"
          placeholder="City"
          value={user.city}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={user.phone}
          onChange={handleChange}
        />

        <label className='cnic'>Upload CNIC Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
          name='image'
        />

      <div className="form-group">
  <input
    type="checkbox"
    id="agreement"
    checked={agreed}
    onChange={(e) => setAgreed(e.target.checked)}
    className='agree'
    required
  />
  <label htmlFor="agreement">
    I agree to the{" "}
    <a href="/terms" target="_blank" rel="noopener noreferrer">
      Terms and Conditions
    </a>
  </label>
</div>

        <button type="submit">Submit</button>

        <p className="auth-switch">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
