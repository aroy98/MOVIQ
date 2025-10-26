// src/api/interceptors.ts
import type { AxiosInstance, AxiosError, AxiosResponse } from "axios";

export const setupInterceptors = (axiosClient: AxiosInstance) => {
  // 🔹 Request Interceptor
  axiosClient.interceptors.request.use(
    (config) => {
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  // 🔹 Response Interceptor
  axiosClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      return Promise.reject(error.response?.data || error);
    }
  );
};
