import React from "react";
import "./Post.scss";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { useDispatch } from "react-redux";
import Avatar from "../avatar/Avatar";
import { likesAndDislike } from "../../redux/slice/postsSlice";
function Post({ post }) {
  const dispatch = useDispatch();
  //method to handlePostLiked
  async function handlePostLiked() {
    //call the async thunk with body as postId
    dispatch(likesAndDislike({ postId: post._id }));
  }
  return (
    <div className="post">
      <div className="heading">
        <Avatar src={post?.owner?.avatar?.url} />
        <h4>{post?.owner?.name}</h4>
      </div>
      <div className="content">
        <img src={post?.image?.url} alt="" />
      </div>
      <div className="footer">
        <div className="like" onClick={handlePostLiked}>
          {post?.isLiked ? (
            <FcLike className="icon" />
          ) : (
            <AiOutlineHeart className="icon" />
          )}
          <h4>{`${post?.likesCount} likes`}</h4>
        </div>
        <p className="caption">{post?.caption}</p>
        <p className="time-ago">4 hrs ago</p>
      </div>
    </div>
  );
}

export default Post;
