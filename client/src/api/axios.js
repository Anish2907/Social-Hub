import axios from "axios";

export default axios.create({
    withCredentials: true,
    baseURL: "https://social-hub-server.netlify.app"
    // baseURL: "https://social-hub-server-ebsq.onrender.com"
    // baseURL: "http://localhost:8000"
});

export const axiosPrivate = axios.create({
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
    baseURL: "https://social-hub-server.netlify.app"
    // baseURL: "https://social-hub-server-ebsq.onrender.com"
    // baseURL: "http://localhost:8000"
});
