import axios from "axios";
import { tokenStore } from "./tokenStore.js";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:9000/api";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = tokenStore.getAccess();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.this.status === 401) {
    }
  },
);

// import axios from 'axios';

// // Base API instance for authenticated requests
// const api = axios.create({
//   baseURL: 'https://api.example.com',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Variables to handle multiple concurrent failing requests
// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });
//   failedQueue = [];
// };

// // 1. Request Interceptor: Attach the current access token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('accessToken'); // Or pull from Redux/Zustand state
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // 2. Response Interceptor: Catch 401s and refresh token
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Check if error status is 401 and the request hasn't been retried yet
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         // If a refresh is already in progress, queue this request
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             originalRequest.headers['Authorization'] = `Bearer ${token}`;
//             return api(originalRequest);
//           })
//           .catch((err) => Promise.reject(err));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const refreshToken = localStorage.getItem('refreshToken');

//         // Use standard axios instance here to avoid interceptor recursion
//         const response = await axios.post('https://example.com', {
//           refreshToken,
//         });

//         const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;

//         // Persist new credentials
//         localStorage.setItem('accessToken', newAccessToken);
//         if (newRefreshToken) {
//           localStorage.setItem('refreshToken', newRefreshToken);
//         }

//         // Update default header and process queued requests
//         api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
//         processQueue(null, newAccessToken);

//         // Retry the original failed request
//         originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//         return api(originalRequest);
//       } catch (refreshError) {
//         processQueue(refreshError, null);

//         // Clear tokens and force log out user if the refresh token is also invalid/expired
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('refreshToken');
//         window.location.href = '/login';

//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;
