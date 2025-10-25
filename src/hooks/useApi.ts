// src/hooks/useApi.ts
import { useState, useCallback } from "react";
import axiosClient from "@/api/axiosClient";

export function useApi<T = any>() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const request = useCallback(async (url: string, method = "GET", data?: any) => {
        try {
            setLoading(true);
            const response = await axiosClient.request<T>({ url, method, data });
            return response.data;
        } catch (err: any) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { request, loading, error };
}
