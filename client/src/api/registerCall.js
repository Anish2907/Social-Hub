import axios from "./axios";

export const register = async (registerInfo) => {
    try {
        const response = await axios.post("/api/auth/register", registerInfo);
        return response;
    } catch (error) {
        return error.response;
    }
}