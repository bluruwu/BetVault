import axios from "axios";
import {supabase} from "./supabase.ts";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use(async (config) => {
    const {data} = await supabase.auth.getSession();
    const token = data.session?.access_token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});
