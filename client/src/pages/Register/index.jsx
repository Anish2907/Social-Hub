import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../../api/registerCall";

export default function Register() {

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordAgain) {
      alert("Password doesn't match");
      return;
    }
    const registerInfo = {
      username,
      email,
      password
    }
    const response = await register(registerInfo);
    if (response.status === 401) {
      alert("User already exits. Please Log in.")
    } else if (response.status === 500) {
      alert("Registration falied. Please try again.")
    } else {
      navigate("/login");
    }
  }

  return (
    <div className="register">
      <div className="card">
        <div className="right">
          <h1>Rgister</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              minLength={2}
              value={username}
              required
              onChange={(e) => { setUserName(e.target.value) }}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => { setEmail(e.target.value) }}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              minLength={6}
              value={password}
              required
              onChange={(e) => { setPassword(e.target.value) }}
            />
            <input
              type="password"
              placeholder="Password Again"
              value={passwordAgain}
              required
              onChange={(e) => { setPasswordAgain(e.target.value) }}
            />
            <button type="submit">
              Rgister
            </button>
          </form>
        </div>
        <div className="left">
          <h1>Social Hub</h1>
          <div className="toLogin">
            <span>Already have an account?</span>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}