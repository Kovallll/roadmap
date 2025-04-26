import { useAuthStore } from '@/features/auth/model/store';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api/',
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    const refreshToken = localStorage.getItem('refresh_token');

    if (
      err.response?.status === 401 &&
      refreshToken &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axiosInstance.post('auth/refresh', {
          refresh_token: refreshToken,
        });

        localStorage.setItem('access_token', data.access_token);
        useAuthStore.getState().setTokens(data.access_token, refreshToken);

        axiosInstance.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${data.access_token}`;
        processQueue(null, data.access_token);

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);
