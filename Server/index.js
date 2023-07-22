const express = require("express");
require("dotenv").config({ path: "./config.env" }); //set the path to config.env location
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDb = require("./dbConnect");
const authRouter = require("./Routers/authRouter");
const postRouter = require("./Routers/postRouter");
const userRouter = require("./Routers/userRouter");
const App = express();

//middlewares::
App.use(express.json()); // used to parse body
App.use(morgan("common")); // morgan middleware used to create logs
App.use(cookieParser()); // used to parse data inside cookies
App.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000", // request from this origin can now access our backend
  })
); // To include Access control policy such that our backend allows resources to accessed from other loc.
//Routers::
App.use("/auth", authRouter); //forward the request to the authRouter if the endpoint is auth:
App.use("/post", postRouter);
App.use("/user", userRouter);
App.get("/", (req, res) => {
  res.status(200).send();
});
connectDb(); //connection establishment with the cloud database
const PORT = process.env.PORT; //fetch the port from config.env file
App.listen(PORT, () => {
  console.log("listening on port :", PORT);
});
