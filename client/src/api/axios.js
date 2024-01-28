import axios from "axios";

export default axios.create({
    withCredentials: true,
    baseURL: "https://social-hub-server-ebsq.onrender.com"
});

export const axiosPrivate = axios.create({
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
    baseURL: "https://social-hub-server-ebsq.onrender.com"
});