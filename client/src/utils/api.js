// src/utils/api.js
import axios from 'axios';
import API from "../axiosConfig";
const api = API.create({
  baseURL: 'http://localhost:5000/api/auth/register', // tumhara Express backend
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
