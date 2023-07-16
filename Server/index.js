const express = require("express");
require("dotenv").config({ path: "./config.env" }); //set the path to config.env location
const connectDb = require("./dbConnect");
const authRouter = require("./Routers/authRouter");
const App = express();
//forward the request to the authRouter if the endpoint is auth:
App.use("/auth", authRouter);
App.get("/", (req, res) => {
  res.status(200).send();
});
connectDb();
const PORT = process.env.PORT; //fetch the port from config.env file
App.listen(PORT, () => {
  console.log("listening on port :", PORT);
});
