"use server"
import axios from "axios";
import { cookies } from "next/headers";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8085",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

axiosInstance.interceptors.request.use(async (config) => {
    const token = (await cookies()).get("access-token")?.value;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});