//it contains the logic for the login,signUp and logout:
//Logic for the signup controller
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//Logic for the signup controller
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
    const isPassCorrect = await bcrypt.compare(password, user.password); //compares the given password with old encrypted pass
    if (!isPassCorrect) return res.status(403).send("Invalid password");
    //create the AccessToken for the user with parameters as: id,email [could be anything]
    const accessToken = generateToken({ _id: user._id });
    //refresh token is used to re-generate access token for the user without the need of re-login
    const refreshToken = generateRefreshToken({ _id: user._id });
    // Access Token need to stored in local storage of frontEnd:
    //Refresh Token need to stored in cookies
    res.cookie("jwt", refreshToken, {
      secure: true,
      httpOnly: true, // will be accessed only to backend not frontend
    });
    return res.status(201).json({
      accessToken,
    });
  } catch (error) {
    console.log(error);
  }
};
//Logic for the refresh controller
//if the refresh token has some validity,it regenerates new Access Token
const refreshAccessTokenController = async (req, res) => {
  const cookies = req.cookies; //fetch the array of cookies
  if (!cookies.jwt) {
    return res.status(401).send("Refresh Token cookie required");
  }
  const refreshToken = cookies.jwt; //fetch the refreshToken from cookie stored with key as jwt
  try {
    //is refreshToken made by our server [verify it using TOKEN_SEC_KEY]
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SEC_KEY);
    const _id = decoded._id;
    const newAccessToken = generateToken({ _id });
    return res.status(201).json({
      newAccessToken,
    });
  } catch (error) {
    return res.status(401).send("Invalid Refresh Token");
  }
};
// internal methods:
function generateToken(payload) {
  try {
    const TOKEN_SEC_KEY = process.env.TOKEN_SEC_KEY; //fetch the token key
    return jwt.sign(payload, TOKEN_SEC_KEY, {
      expiresIn: "5m",
    }); //use sign method of JWT to create & return accessToken
  } catch (error) {
    console.log(error);
  }
}
//Method to generate refresh token:
function generateRefreshToken(payload) {
  try {
    const REFRESH_TOKEN_SEC_KEY = process.env.REFRESH_TOKEN_SEC_KEY; //fetch the token key
    return jwt.sign(payload, REFRESH_TOKEN_SEC_KEY, {
      expiresIn: "1y",
    }); //use sign method of JWT to create & return accessToken
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  signupController,
  loginController,
  refreshAccessTokenController,
};
