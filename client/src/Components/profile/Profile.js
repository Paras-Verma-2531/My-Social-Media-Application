import React, { useEffect, useState } from "react";
import "./Profile.scss";
import userImg from "../../assets/user.png";
import Post from "../post/Post";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CreatePost from "../createPost/CreatePost";
import { getUserProfile } from "../../redux/slice/postsSlice";
function Profile() {
  const navigate = useNavigate();
  const params = useParams();
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const userProfile = useSelector((store) => store.postReducer.userProfile);
  const dispatch = useDispatch();
  const [isMyProfile, setIsMyProfile] = useState(false);
  //whenever the page renders/load call the get User profile API
  useEffect(() => {
    dispatch(
      getUserProfile({
        userId: params.userId,
      })
    );
    //set isMyProfile:: based on validation
    setIsMyProfile(params.userId === myProfile?._id);
  }, [myProfile]);
  return (
    <div className="profile">
      <div className="container">
        <div className="left-part">
          {/* component which allow user to create post */}
          <CreatePost />
          {/* iterate on user's profile posts and render them */}
          {userProfile?.posts?.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
        <div className="right-part">
          <div className="profile-card">
            <img
              src={userProfile?.avatar?.url || userImg}
              alt="user-img"
              className="user-img"
            />
            <h3 className="user-name">{userProfile?.name}</h3>
            <div className="follower-info">
              <h4>{`${userProfile?.followers?.length || 0} followers`}</h4>
              <h4>{`${userProfile?.followings?.length || 0} followings`}</h4>
            </div>
            {!isMyProfile && (
              <button className="follow btn btn-primary">follow</button>
            )}
            {isMyProfile && (
              <button
                className="update btn btn-secondary"
                onClick={() => navigate("/updateProfile")}
              >
                Update Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
