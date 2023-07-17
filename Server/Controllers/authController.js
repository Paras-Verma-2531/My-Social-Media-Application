//it contains the logic for the login,signUp and logout:
//Logic for the signup controller
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signupController = async (req, res) => {
  try {
    const { email, password } = req.body; //fetch the email ,password from req.body
    if (!email || !password)
      return res.status(400).send("Email and password required!"); //if either of 2 is missing
    const oldUser = await User.findOne({ email });
    if (oldUser) return res.status(409).send("Email is already registered");
    //if user is new, encrypt its password and create new entry in db
    const decryptPass = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: decryptPass,
    });
    return res.status(201).json({
      newUser,
    });
  } catch (error) {
    console.log(error);
  }
};
//Logic for the login controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).send("Email and password required for login!");
    const user = await User.findOne({ email });
    // Invalid credential:: user does not exists
    if (!user) return res.status(404).send("User Not Found");
    //compare if the given password is correct
    const isPassCorrect = await bcrypt.compare(password, user.password); //compares the given password with old decrypted pass
    if (!isPassCorrect) return res.status(403).send("Invalid password");
    //create the AccessToken for the user with parameters as: id,email [could be anything]
    const accessToken = generateToken({ _id: user._id, email: user.email });
    return res.status(201).json({
      accessToken,
    });
  } catch (error) {
    console.log(error);
  }
};
// internal methods:
function generateToken(payload) {
  try {
    return jwt.sign(payload, "scldhflascveghdavhdfagervfwefcsvnegev", {
      expiresIn: "20s",
    }); //use sign method of JWT to create & return accessToken
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  signupController,
  loginController,
};
