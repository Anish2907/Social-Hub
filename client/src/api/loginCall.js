import axios from "./axios";
import { LoginStart, LoginSuccess, LoginFailure } from "../context/AuthAction";

export const login = async (loginInfo, dispatch) => {
    dispatch(LoginStart(loginInfo));
    try {
        const response = await axios.post("/api/auth/login", loginInfo);
        dispatch(LoginSuccess(response.data));
        return response.data;
    } catch (error) {
        dispatch(LoginFailure(error));
        return error.response;
    }
}