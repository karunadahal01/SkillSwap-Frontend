// src/config/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔹 Request interceptor: attach access token
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Response interceptor (refresh token later)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // For now, just reject
    return Promise.reject(error);
  }
);

export default api;
