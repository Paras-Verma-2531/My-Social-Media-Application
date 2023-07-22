const User = require("../Models/User");
const { success, error } = require("../Utils/responseWrapper");
const followOrUnfollowController = async (req, res) => {
  const { userIdToFollow } = req.body;
  const currUserId = req._id;
  try {
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
module.exports = followOrUnfollowController;
