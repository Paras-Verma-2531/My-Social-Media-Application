import React, { useState } from "react";
import { Link } from "react-router-dom";
import {axiosClient} from '../../Utils/axiosClient'
import "./Login.scss";
function Login() {
  //fetch the data::
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
 //function to handle Data on submit
  async function handleSubmit(event)
 {
   event.preventDefault();//prevent the default behaviour of form
   const result= await axiosClient.post('/auth/login',
   //send the data in the body of API
   {
     email:userEmail,
     password:userPassword
   })
   console.log(result);
 }
  return (
    <div className="Login">
      <div className="login-box">
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="login-input"
            onChange={(event) => setUserEmail(event.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input 
          type="password" 
          id="password" 
          className="login-input"
          onChange={(event) => setUserPassword(event.target.value)}
          />
          <input type="submit" className="login-submit" />
        </form>
        <p className="signup-Navigate">
          Create an Account?
          <span>
            <Link className="link" to="/signup">
              Signup
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}
export default Login;
