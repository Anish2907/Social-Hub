import "./index.scss";
import { Link } from "react-router-dom";

export default function Login() {
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
                <form>
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <button>Login</button>
                </form>
            </div>
        </div>
    </div>
  )
}