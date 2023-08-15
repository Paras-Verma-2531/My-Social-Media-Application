import React from "react";
import "./Post.scss";
import dummyImg from "../../assets/dummy.jpg";
import { AiOutlineHeart } from "react-icons/ai";
import Avatar from "../avatar/Avatar";
function Post({ post }) {
  return (
    <div className="post">
      <div className="heading">
        <Avatar src={post?.owner?.avatar?.url}/>
        <h4>{post?.owner?.name}</h4>
      </div>
      <div className="content">
        <img src={post?.image?.url} alt="" />
      </div>
      <div className="footer">
        <div className="like">
          <AiOutlineHeart className="icon" />
          <h4>{`${post?.likesCount} likes`}</h4>
        </div>
        <p className="caption">
          {post?.caption}
        </p>
        <p className="time-ago">4 hrs ago</p>
      </div>
    </div>
  );
}

export default Post;
