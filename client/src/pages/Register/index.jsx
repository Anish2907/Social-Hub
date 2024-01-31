import "./index.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { register } from "../../api/registerCall";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordAgain) {
      toast.error("Passwords should match.", {
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
      return;
    }
    setIsLoading(true);
    const registerInfo = {
      username,
      email,
      password
    }
    try {
      const response = await register(registerInfo);
      if (response.status === 401) {
        // alert("User already exits. Please Log in.")
        toast.warn(response.data.message, {
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
      } else if (response.status === 402) {
        // alert("Registration falied. Please try again.")
        toast.error(response.data.message, {
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
        // alert("Registration falied. Please try again.")
        toast.warn(response.data.message, {
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
        // navigate("/login");
        toast.success(response.data.message, {
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
      }
    } finally {
      setIsLoading(false);
    }

  }

  return (
    <div className="register">
      <div className="card">
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
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
            <button type="submit" disabled={isLoading} style={{ cursor: isLoading ? "not-allowed" : "pointer" }}>
              Register
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