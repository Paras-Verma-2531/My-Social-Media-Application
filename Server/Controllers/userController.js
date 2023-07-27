const Post = require("../Models/Post");
const User = require("../Models/User");
const { success, error } = require("../Utils/responseWrapper");
const followOrUnfollowController = async (req, res) => {
  const { userIdToFollow } = req.body;
  const currUserId = req._id;
  try {
    if (userIdToFollow === currUserId)
      return res.send(error(400, "Users cannot follow themself"));
    const currUser = await User.findById(currUserId);
    const userToFollow = await User.findById(userIdToFollow); //is user to follow valid?
    if (!userToFollow) return res.send(error(404, "User to follow not found"));
    // if already following the user:
    if (currUser.followings.includes(userIdToFollow)) {
      const index = currUser.followings.indexOf(userIdToFollow);
      currUser.followings.splice(index, 1); //remove from following list
      const followerIndex = await userToFollow.followers.indexOf(currUserId);
      // remove from the followers list of other user
      userToFollow.followers.splice(followerIndex, 1);
      await userToFollow.save();
      await currUser.save();
      return res.send(success(200, "user unfollowed"));
    } //following new user
    else {
      currUser.followings.push(userIdToFollow);
      userToFollow.followers.push(currUserId);
      await userToFollow.save();
      await currUser.save();
      return res.send(success(200, "user followed"));
    }
  } catch (err) {
    return res.send(error(500, err.message));
  }
};
// Controller to get posts of user followings::
const getPostOfFollowingController = async (req, res) => {
  const currUserId = req._id;
  const currUser = await User.findById(currUserId);
  //fetch post of currUser followings:
  try {
    const posts = await Post.find({
      // get post of all the users: where owner of post is present in user's following list
      owner: {
        $in: currUser.followings,
      },
    });
    // Another approach could be to iterate in followings of user and fetch their posts
    return res.send(success(200, posts));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};
//getMyPosts controller
const getMyPostsController = async (req, res) => {
  const currUserId = req._id;
  try {
    if (!(await User.findById(currUserId)))
      return res.send(error(404, "user does not exists"));
    const myPosts = await Post.find({
      //find all the posts where owner of the post is === currUserId:
      owner: currUserId,
    }).populate("likes");
    return res.send(success(200, { myPosts }));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};
//get UserPosts
const getUserPostsController = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.send(error(404, "user not found"));
    //user exists
    const userPosts = await Post.find({ owner: userId }); //fetch all the posts where owner===userId
    return res.send(success(200, { userPosts }));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};
//deleteMyProfile controller
const deleteMyProfileController = async (req, res) => {
  const currUserId = req._id;
  try {
    const currUser = await User.findById(currUserId);
    if (!currUser) return res.send(error(404, "user profile not found"));
    //delete all the posts of this user:
    await Post.deleteMany({ owner: currUserId });
    //remove the user from the following list of his followers
    currUser.followers.forEach(async (followerId) => {
      const follower = await User.findById(followerId);
      const index = follower.followings.indexOf(currUserId);
      follower.followings.splice(index, 1);
      await follower.save();
    });
    //remove the user from follower list of his followings'
    currUser.followings.forEach(async (followingId) => {
      const following = await User.findById(followingId);
      const index = following.followers.indexOf(currUserId);
      following.followers.splice(index, 1);
      await following.save();
    });
    //dislike the user from the posts he liked:
    const allPosts = await Post.find();
    allPosts.forEach(async (post) => {
      if (post.likes.includes(currUserId)) {
        const index = post.likes.indexOf(currUserId);
        post.likes.splice(index, 1);
      }
      await post.save();
    });
    //delete the user
    await User.deleteOne({ _id: currUserId });

    //remove the refreshtoken from the cookies as well
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
    });
    return res.send(success(200, "User profile deleted"));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};
//getProfileController
const getProfileController = async (req, res) => {
  const currUserId = req._id;
  try {
    const currUser = await User.findById(currUserId);
    if (!currUser) return res.send(error(404, "User profile not found"));
    return res.send(success(200, { currUser }));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};
module.exports = {
  followOrUnfollowController,
  getPostOfFollowingController,
  getMyPostsController,
  getUserPostsController,
  deleteMyProfileController,
  getProfileController,
};
