const {
  followOrUnfollowController,
  getPostOfFollowingController,
  getMyPostsController,
  getUserPostsController,
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
userRouter.post("/userPosts", requireUserMiddleware, getUserPostsController);
module.exports = userRouter;
