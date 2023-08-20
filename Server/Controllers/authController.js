//it contains the logic for the login,signUp and logout:
//Logic for the signup controller
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { success, error } = require("../Utils/responseWrapper");
//Logic for the signup controller
const signupController = async (req, res) => {
  try {
    const { email, password, name } = req.body; //fetch the email ,password from req.body
    if (!email || !password || !name)
      // return res.status(400).send("Email and password required!"); //if either of 2 is missing
      return res.send(error(400, "All fields are required!"));
    const oldUser = await User.findOne({ email });
    if (oldUser) return res.send(error(409, "Email is already registered"));
    //if user is new, encrypt its password and create new entry in db
    const decryptPass = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: decryptPass,
    });
    //return res.status(201).json({newUser});
    return res.send(success(201, "new user created successfully"));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};
//Logic for the login controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.send(error(400, "Email and password required for login!"));
    const user = await User.findOne({ email }).select("+password"); //by default password is hidden :: therefore include it manually
    // Invalid credential:: user does not exists
    if (!user) return res.send(error(404, "User Not Found"));
    //compare if the given password is correct
    const isPassCorrect = await bcrypt.compare(password, user.password); //compares the given password with old encrypted pass
    if (!isPassCorrect) return res.send(error(500, "Invalid password"));
    //create the AccessToken for the user with parameters as: object_id [could be anything]
    const accessToken = generateToken({ _id: user._id });
    //refresh token is used to re-generate access token for the user without the need of re-login
    const refreshToken = generateRefreshToken({ _id: user._id });
    // Access Token need to stored in local storage of frontEnd:
    //Refresh Token need to stored in cookies
    res.cookie("jwt", refreshToken, {
      secure: true,
      httpOnly: true, // will be accessed only to backend not frontend
    });
    return res.send(success(201, { accessToken }));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};
//Logic for the logOut controller
const logOutController = async (req, res) => {
  //the duty of backend is to delete the RT. cookie :: And the duty of frontend would be to delete the AT. from localStor.
  try {
    res.clearCookie("jwt", {
      //RefreshToken
      httpOnly: true,
      secure: true,
    });
    return res.send(success(200, "Cookie deleted"));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};
//Logic for the refresh controller
//if the refresh token has some validity,it regenerates new Access Token
const refreshAccessTokenController = async (req, res) => {
  const cookies = req.cookies; //fetch the array of cookies
  if (!cookies.jwt) {
    return res.send(error(401, "Refresh Token cookie required"));
  }
  const refreshToken = cookies.jwt; //fetch the refreshToken from cookie stored with key as jwt
  try {
    //is refreshToken made by our server [verify it using TOKEN_SEC_KEY]
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SEC_KEY);
    const _id = decoded._id;
    const newAccessToken = generateToken({ _id });
    return res.send(success(201, { newAccessToken }));
  } catch (error) {
    return res.send(error(401, "Invalid Refresh Token"));
  }
};
// internal methods:
function generateToken(payload) {
  try {
    const TOKEN_SEC_KEY = process.env.TOKEN_SEC_KEY; //fetch the token key
    return jwt.sign(payload, TOKEN_SEC_KEY, {
      expiresIn: "1d",
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
  logOutController,
};
