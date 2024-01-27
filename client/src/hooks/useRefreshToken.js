import axios from "../api/axios";
import useAuth from "./useAuth";
import { NewAccessToken, SessionExpired } from "../context/AuthAction";

const useRefreshToken = () => {

  const { dispatch } = useAuth();

  const refresh = async () => {
    try {
      const response = await axios.get("/api/refresh");

      dispatch(NewAccessToken(response.data.accessToken));
      return response.data.accessToken;
    } catch (error) {
      console.log(error);
      dispatch(SessionExpired(error));
    }
  }

  return refresh;
}

export default useRefreshToken