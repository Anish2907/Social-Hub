import axios from "axios";

export default axios.create({
    withCredentials: true,
    baseURL: "http://localhost:8000"
});

export const axiosPrivate = axios.create({
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
    baseURL: "http://localhost:8000"
});