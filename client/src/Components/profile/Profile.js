import React from "react";
import "./Profile.scss";
import userImg from "../../assets/user.png";
import Post from "../post/Post";
import { useNavigate } from "react-router-dom";
function Profile() {
  const navigate = useNavigate();
  return (
    <div className="profile">
      <div className="container">
        <div className="left-part">
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
        <div className="right-part">
          <div className="profile-card">
            <img src={userImg} alt="user-img" className="user-img" />
            <h3 className="user-name">Paras Verma</h3>
            <div className="follower-info">
              <h4>40 followers</h4>
              <h4>20 followings</h4>
            </div>
            <button className="follow btn btn-primary">follow</button>
            <button
              className="update btn btn-secondary"
              onClick={() => navigate("/updateProfile")}
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
