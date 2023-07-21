const {
  getAllPostController,
  createPostController,
} = require("../Controllers/postController");
const requireUserMiddleware = require("../Middlewares/requireUser");
const postRouter = require("express").Router();
postRouter.get("/all", requireUserMiddleware, getAllPostController);
postRouter.post("/", requireUserMiddleware, createPostController);
module.exports = postRouter;
