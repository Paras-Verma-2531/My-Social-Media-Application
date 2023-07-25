import React from "react";
import "./Post.scss";
import dummyImg from "../../assets/dummy.jpg";
import { AiOutlineHeart } from "react-icons/ai";
import Avatar from "../avatar/Avatar";
function Post({ post }) {
  return (
    <div className="post">
      <div className="heading">
        <Avatar />
        <h4>Paras</h4>
      </div>
      <div className="content">
        <img src={dummyImg} alt="" />
      </div>
      <div className="footer">
        <div className="like">
          <AiOutlineHeart className="icon" />
          <h4>4 likes</h4>
        </div>
        <p className="caption">
          Lost in the wilderness, finding solace in nature's embrace 🌿🍃
        </p>
        <p className="time-ago">4 hrs ago</p>
      </div>
    </div>
  );
}

export default Post;
