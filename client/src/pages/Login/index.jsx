import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../../api/loginCall";
import useAuth from "../../hooks/useAuth";


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
            alert("Invalid Email or Password.");
        } else if (response.status === 500) {
            alert("Login falied. Please try again.");
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
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, debitis reiciendis? Deleniti numquam dolore deserunt amet vitae sapiente animi aspernatur doloribus nemo, in excepturi fuga, non sunt aliquid tenetur nostrum?
                    </p>
                    <span>Don't have an account?</span>
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                        <button type="submit">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}