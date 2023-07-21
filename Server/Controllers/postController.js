const Post = require("../Models/Post");
const User = require("../Models/User");
const { success, error } = require("../Utils/responseWrapper");
const getAllPostController = async (req, res) => {
  return res.send(success(200, "these are all your post"));
};
const createPostController = async (req, res) => {
  const { caption } = req.body;
  const owner = req._id;
  const user = await User.findById(owner); //find the user to whom this post belong
  try {
    const post = await Post.create({
      owner,
      caption,
    });
    user.posts.push(post._id); //push the post id into the posts array of User schema
    await user.save(); // to update changes to user schema
    return res.send(success(201, post));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};
module.exports = { createPostController, getAllPostController };
