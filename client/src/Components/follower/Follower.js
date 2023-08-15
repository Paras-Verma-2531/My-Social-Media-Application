import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "../avatar/Avatar";
import "./Follower.scss";
function Follower({ user }) {
  const feedData = useSelector((store) => store.feedReducer.feedData);
  const [isFollowing, setIsFollowing] = useState(false);
  useEffect(() => {
    setIsFollowing(feedData?.followings?.find((item) => item._id === user._id));
  }, [feedData]);
  return(
    // curr user should not be visible in suggestions section
  feedData?._id!==user._id&&
    <div className="follower">
      <div className="user-info">
        <Avatar src={user?.avatar?.url} />
        <h4 className="name">{user?.name}</h4>
      </div>
      <h5
        className={isFollowing ? "hover-link follow-link" : "btn btn-primary"}
      >
        {isFollowing ? "unfollow" : "follow"}
      </h5>
    </div>
  )
}

export default Follower;
