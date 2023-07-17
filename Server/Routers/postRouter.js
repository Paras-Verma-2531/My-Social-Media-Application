const getAllPostController = require("../Controllers/postController");
const requireUserMiddleware = require("../Middlewares/requireUser");
const postRouter = require("express").Router();
postRouter.get("/all", requireUserMiddleware, getAllPostController);
module.exports = postRouter;
