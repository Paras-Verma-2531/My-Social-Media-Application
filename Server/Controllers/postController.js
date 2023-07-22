const Post = require("../Models/Post");
const User = require("../Models/User");
const { success, error } = require("../Utils/responseWrapper");
const getAllPostController = async (req, res) => {
  return res.send(success(200, "these are all your post"));
};
//controller to create new post
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
// controller to like and dislike
const likeAndDislikeController = async (req, res) => {
  const { postId } = req.body;
  const currUserId = req._id; // viewer of the post

  try {
    const post = await Post.findById(postId);
    if (!post) return res.send(error(404, "Post not found"));
    // if user present :: means user already liked the post
    if (post.likes.includes(currUserId)) {
      const index = post.likes.indxOf(currUserId);
      post.likes.splice(index, 1); //delete 1 element present at index:
      await post.save();
      return res.send(success(200, "post unliked"));
    }
    //like the post
    post.likes.push(currUserId); //add curr user id
    await post.save();
    return res.send(success(200, "post liked"));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};
module.exports = {
  createPostController,
  getAllPostController,
  likeAndDislikeController,
};
