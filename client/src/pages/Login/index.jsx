import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../../api/loginCall";
import useAuth from "../../hooks/useAuth";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { dispatch } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginInfo = {
            email,
            password
        }
        const response = await login(loginInfo, dispatch);
        if (response.status === 400) {
            toast.error("Invalid Email or Password.", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        } else if (response.status === 500) {
            toast.warn("Login falied. Please try again.", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        } else {
            window.localStorage.setItem("isLoggedIn", true);
            navigate("/");
        }
    }

    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>Social Hub</h1>
                    <div className="toRegister">
                        <span>Don't have an account?</span>
                        <Link to="/register">
                            <button>Register</button>
                        </Link>
                    </div>
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            required
                        />
                        <button type="submit">
                            Login
                        </button>
                    </form>
                </div>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Bounce}
                />
            </div>
        </div>
    )
}