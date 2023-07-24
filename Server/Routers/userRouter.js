const {
  followOrUnfollowController,
  getPostOfFollowingController,
  getMyPostsController,
} = require("../Controllers/userController");
const requireUserMiddleware = require("../Middlewares/requireUser");
const userRouter = require("express").Router();
userRouter.post("/follow", requireUserMiddleware, followOrUnfollowController);
userRouter.get(
  "/getPosts",
  requireUserMiddleware,
  getPostOfFollowingController
);
userRouter.get("/myPosts", requireUserMiddleware, getMyPostsController);
module.exports = userRouter;
