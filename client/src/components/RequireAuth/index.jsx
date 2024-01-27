import useAuth from "../../hooks/useAuth";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
    const { user } = useAuth();
    const location = useLocation();

    return (
        user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;