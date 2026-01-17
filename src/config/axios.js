// src/config/axios.js
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://192.168.1.75:8080';

console.log('🌐 API Base URL:', BASE_URL);

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// ✅ Request interceptor with DETAILED logging
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    
    // ✅ ALWAYS set Authorization header if token exists
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    // ✅ CRITICAL: Log EVERYTHING
    console.log('📤 ========== API REQUEST ==========');
    console.log('   Method:', config.method?.toUpperCase());
    console.log('   URL:', config.url);
    console.log('   Full URL:', config.baseURL + config.url);
    console.log('   Content-Type:', config.headers['Content-Type']);
    console.log('   Has Token:', !!accessToken);
    console.log('   Token Preview:', accessToken ? accessToken.substring(0, 30) + '...' : 'NONE');
    console.log('   Authorization Header:', config.headers.Authorization ? 'SET' : 'NOT SET');
    console.log('   All Headers:', config.headers);
    console.log('===================================');
    
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('✅ Response:', response.config.url, response.status);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    console.error('❌ ========== API ERROR ==========');
    console.error('   URL:', error.config?.url);
    console.error('   Status:', error.response?.status);
    console.error('   Message:', error.message);
    console.error('   Response Data:', error.response?.data);
    console.error('   Response Headers:', error.response?.headers);
    console.error('==================================');

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (refreshToken) {
          const response = await axios.post(
            `${BASE_URL}/api/auth/refresh`,
            { refreshToken }
          );

          const { accessToken: newAccessToken, refreshToken: newRefreshToken} = 
            response.data.data;
          
          localStorage.setItem('accessToken', newAccessToken);
          if (newRefreshToken) {
            localStorage.setItem('refreshToken', newRefreshToken);
          }

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error('❌ Token refresh failed:', refreshError);
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return `${BASE_URL}/${cleanPath}`;
};

export default api;