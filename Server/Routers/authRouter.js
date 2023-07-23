const Router = require("express").Router();
const {
  signupController,
  loginController,
  refreshAccessTokenController,
  logOutController,
} = require("../Controllers/authController");
Router.post("/login", loginController); // if endpoint is login go to the loginController
Router.post("/signup", signupController);
Router.get("/refresh", refreshAccessTokenController);
Router.get("/logout", logOutController);
module.exports = Router;
