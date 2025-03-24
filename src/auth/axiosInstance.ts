import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { refreshAccessToken } from "../services/authService"; // Update path if needed
import { Navigate } from "react-router-dom";

const baseUrl =import.meta.env.VITE_API_BASE_URL;
console.log(baseUrl);

const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true, // Required for sending cookies
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// Function to handle refresh token subscribers
const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Wait for token to refresh and retry request
        return new Promise((resolve) => {
          refreshSubscribers.push((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshAccessToken();
        localStorage.setItem("accessToken", newToken);
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

        onRefreshed(newToken);

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        Navigate({to: '/login'});
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    Navigate({to: '/login'});
    return Promise.reject(error);

  }
);

export default axiosInstance;
