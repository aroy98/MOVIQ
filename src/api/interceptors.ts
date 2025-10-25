// src/api/interceptors.ts
import type { AxiosInstance, AxiosError, AxiosResponse } from "axios";
import { getToken, clearToken } from "@/utils/storage";

export const setupInterceptors = (axiosClient: AxiosInstance) => {
  // 🔹 Request Interceptor
  axiosClient.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  // 🔹 Response Interceptor
  axiosClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        clearToken();
        window.location.href = "/login"; // optional redirect
      }

      return Promise.reject(error.response?.data || error);
    }
  );
};
