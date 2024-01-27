import { useContext } from "react";
import { UserContext } from "../context/AuthContext";

const useAuth = () => {
    return useContext(UserContext);
}

export default useAuth;