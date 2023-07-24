const {
  getAllPostController,
  createPostController,
  likeAndDislikeController,
  updatePostController,
  deletePostController,
} = require("../Controllers/postController");
const requireUserMiddleware = require("../Middlewares/requireUser");
const postRouter = require("express").Router();
postRouter.get("/all", requireUserMiddleware, getAllPostController);
postRouter.post("/", requireUserMiddleware, createPostController);
postRouter.post("/like", requireUserMiddleware, likeAndDislikeController);
postRouter.put("/update", requireUserMiddleware, updatePostController);
postRouter.delete("/delete", requireUserMiddleware, deletePostController);
module.exports = postRouter;
