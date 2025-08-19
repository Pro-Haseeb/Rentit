import axios from "axios";

// Centralized axios instance
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // env variable se backend URL lega
  // Agar zarurat ho to headers ya credentials bhi yahan set kar sakte ho
  // headers: { "Content-Type": "application/json" },
  // withCredentials: true
});

export default API;
