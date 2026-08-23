import axios from "axios"

export const API_BASE_URL = 'http://localhost:3000'

export const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true
});