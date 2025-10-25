// src/api/axiosClient.ts
import axios from "axios";
import { setupInterceptors } from "@/api/interceptors";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://api.example.com",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`
  },
  timeout: 10000, // optional
});

// attach interceptors
setupInterceptors(axiosClient);

export default axiosClient;
