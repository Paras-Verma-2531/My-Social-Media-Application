import React from "react";
import Follower from "../follower/Follower";
import Post from "../post/Post";
import "./Feed.scss";
function Feed() {
  return (
    <div className="feed">
      <div className="container">
        {/* left part shows multiple posts */}
        <div className="left-part">
          <Post />
          <Post />
          <Post />
        </div>
        {/* right-part shows followings of current user */}
        <div className="right-part">
          <div className="following">
            <h3 className="title">You are following</h3>
            <Follower/>
            <Follower/>
            <Follower/>
            <Follower/>
          </div>
          <div className="suggestions">
            <h3 className="title">Suggested for you</h3>
            <Follower/>
            <Follower/>
            <Follower/>
            <Follower/>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Feed;
