import "./index.scss";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="register">
        <div className="card">
          <div className="right">
                  <h1>Rgister</h1>
                  <form>
                      <input type="text" placeholder="Username" />
                      <input type="email"
                      placeholder="Email" />
                      <input type="password" placeholder="Password" />
                      <input type="password"
                      placeholder="Password Again" />
                      
                      <button>Rgister</button>
                  </form>
          </div>
          <div className="left">
                  <h1>Social Hub</h1>
                  <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, debitis reiciendis? Deleniti numquam dolore deserunt amet vitae sapiente animi aspernatur doloribus nemo, in excepturi fuga, non sunt aliquid tenetur nostrum?
                  </p>
                  <span>Already have an account?</span>
                  <Link to="/login">
                    <button>Login</button>
                  </Link>
          </div>
        </div>
    </div>
  )
}