const followOrUnfollowController = require("../Controllers/userController");
const requireUserMiddleware = require("../Middlewares/requireUser");
const userRouter = require("express").Router();
userRouter.post("/follow", requireUserMiddleware, followOrUnfollowController);
module.exports = userRouter;
