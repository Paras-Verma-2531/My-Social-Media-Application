const {
  getAllPostController,
  createPostController,
  likeAndDislikeController,
} = require("../Controllers/postController");
const requireUserMiddleware = require("../Middlewares/requireUser");
const postRouter = require("express").Router();
postRouter.get("/all", requireUserMiddleware, getAllPostController);
postRouter.post("/", requireUserMiddleware, createPostController);
postRouter.post("/like", requireUserMiddleware, likeAndDislikeController);
module.exports = postRouter;
