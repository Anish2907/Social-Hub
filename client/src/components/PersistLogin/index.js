import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import { PageRefresh } from "../../context/AuthAction";


const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { user, dispatch } = useAuth();

    useEffect(() => {
        const verifyRefeshToken = async () => {
            try {
                const respose = await axios.get("/api/persistLogIn");
                dispatch(PageRefresh(respose.data));
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }

        !user?.accessToken ? verifyRefeshToken() : setIsLoading(false);
    }, [dispatch, user?.accessToken]);

    return (
        <>
            {isLoading
                ? <p>Loading...</p>
                : <Outlet />
            }
        </>
    );
}

export default PersistLogin;