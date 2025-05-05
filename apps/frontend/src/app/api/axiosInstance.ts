import { LOCAL_STORAGE } from '@/shared/model';
import { useAuthStore } from '@/shared/model';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACK_HOST,
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
  const token = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    const status = err?.response?.status;
    const refreshToken = localStorage.getItem(LOCAL_STORAGE.REFRESH_TOKEN);

    if (status === 401 && refreshToken && !originalRequest._retry) {
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
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACK_HOST}auth/refresh`,
          {
            refresh_token: refreshToken,
          }
        );

        localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, data.access_token);
        useAuthStore.getState().setTokens(data.access_token, refreshToken);

        axiosInstance.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${data.access_token}`;
        processQueue(null, data.access_token);

        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
        localStorage.removeItem(LOCAL_STORAGE.REFRESH_TOKEN);
        useAuthStore.getState().logout();
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (status === 401) {
      localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
      localStorage.removeItem(LOCAL_STORAGE.REFRESH_TOKEN);
      useAuthStore.getState().logout();
    }

    return Promise.reject(err);
  }
);
