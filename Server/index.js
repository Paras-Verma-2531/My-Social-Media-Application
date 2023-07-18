const express = require("express");
require("dotenv").config({ path: "./config.env" }); //set the path to config.env location
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDb = require("./dbConnect");
const authRouter = require("./Routers/authRouter");
const postRouter = require("./Routers/postRouter");
const App = express();

//middlewares::
App.use(express.json()); // used to parse body
App.use(morgan("common")); // morgan middleware used to create logs
App.use(cookieParser()); // used to parse data inside cookies
//Routers::
App.use("/auth", authRouter); //forward the request to the authRouter if the endpoint is auth:
App.use("/post", postRouter);
App.get("/", (req, res) => {
  res.status(200).send();
});
connectDb(); //connection establishment with the cloud database
const PORT = process.env.PORT; //fetch the port from config.env file
App.listen(PORT, () => {
  console.log("listening on port :", PORT);
});
