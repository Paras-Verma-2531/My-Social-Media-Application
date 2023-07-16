const Router = require("express").Router();
const {
  signupController,
  loginController,
} = require("../Controllers/authController");
Router.post("/login", loginController); // if endpoint is login go to the loginController
Router.post("/signup", signupController); // if endpoint is lsignup go to the signupController
module.exports = Router;
