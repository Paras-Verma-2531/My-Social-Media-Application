//it contains the logic for the login,signUp and logout:
//Logic for the signup controller
const signupController = async (req, res) => {
  try {
    res.send("signup controller");
  } catch (error) {}
};
//Logic for the login controller
const loginController = async (req, res) => {
  try {
    res.send("login controller");
  } catch (error) {}
};
module.exports = {
  signupController,
  loginController,
};
