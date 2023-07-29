const {
  followOrUnfollowController,
  getPostOfFollowingController,
  getMyPostsController,
  getUserPostsController,
  deleteMyProfileController,
  getProfileController,
  updateProfileController,
} = require("../Controllers/userController");
const requireUserMiddleware = require("../Middlewares/requireUser");
const userRouter = require("express").Router();
userRouter.post("/follow", requireUserMiddleware, followOrUnfollowController);
//API to: get posts of his followings:
userRouter.get(
  "/getPosts",
  requireUserMiddleware,
  getPostOfFollowingController
);
userRouter.get("/myPosts", requireUserMiddleware, getMyPostsController);
userRouter.post("/userPosts", requireUserMiddleware, getUserPostsController);
//API to delete user's account
userRouter.delete("/", requireUserMiddleware, deleteMyProfileController);
userRouter.get("/getMyProfile", requireUserMiddleware, getProfileController);
userRouter.put("/", requireUserMiddleware, updateProfileController);
module.exports = userRouter;
