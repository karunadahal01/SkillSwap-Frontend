// // src/config/axios.js
// import axios from 'axios';

// const api = axios.create({
//   // ✅ UPDATED: Use your laptop's actual IP address
//   baseURL: 'http://192.168.1.75:8080',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   timeout: 30000, // 30 second timeout
// });

// // 🔹 Request interceptor: attach access token
// api.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem('accessToken');
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // 🔹 Response interceptor: Handle token refresh
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // If 401 and we haven't retried yet
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = localStorage.getItem('refreshToken');
        
//         if (refreshToken) {
//           // Try to refresh the access token
//           const response = await axios.post(
//             'http://192.168.1.75:8080/api/auth/refresh',
//             { refreshToken }
//           );

//           const { accessToken: newAccessToken } = response.data;
//           localStorage.setItem('accessToken', newAccessToken);

//           // Retry the original request with new token
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//           return api(originalRequest);
//         }
//       } catch (refreshError) {
//         // Refresh failed, redirect to login
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('refreshToken');
//         window.location.href = '/login';
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;



// src/config/axios.js
import axios from 'axios';

const BASE_URL = 'http://192.168.1.75:8080'; // ✅ Your laptop IP

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
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

// 🔹 Response interceptor: Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (refreshToken) {
          // Try to refresh the access token
          const response = await axios.post(
            `${BASE_URL}/api/auth/refresh`,
            { refreshToken }
          );

          // ✅ FIXED: Your backend returns { message, success, data: { accessToken, refreshToken } }
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.data;
          
          // Update both tokens
          localStorage.setItem('accessToken', newAccessToken);
          if (newRefreshToken) {
            localStorage.setItem('refreshToken', newRefreshToken);
          }

          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, clear storage and redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user'); // Also clear user data if you store it
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;