import React from "react";
import { Link } from "react-router-dom";
import "./Signup.scss";
function Signup() {
  return (
    <div className="Signup">
      <div className="signup-box">
        <h2 className="signup-heading">Signup</h2>
        <form>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" className="signup-input" />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" className="signup-input" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" className="signup-input" />
          <input type="submit" className="signup-submit" />
        </form>
        <p className="login-Navigate">
          Already have an Account?
          <span>
            <Link className="link" to="/login">
              Login
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
