import React from "react";
import { Link } from "react-router-dom";
import './Login.scss';
function Login() {
  return (
    <div className="Login">
      <div className="login-box">
          <h2 className="login-heading">Login</h2>
          <form>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" className="login-input"/>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" className="login-input"/>
              <input type="submit" className="login-submit"/>
          </form>
          <p className="signup-Navigate">Create an Account?<span><Link className="link"to='/signup'>Signup</Link></span></p>
      </div>
    </div>
  );
}
export default Login;
