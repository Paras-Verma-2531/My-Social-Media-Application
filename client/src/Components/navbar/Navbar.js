import React from "react";
import Avatar from "../avatar/Avatar";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import "./Navbar.scss";
import { useSelector } from "react-redux";
function Navbar() {
  const userProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="container">
        {/* whenever user clicks on banner --> redirect to home page */}
        <h2 className="left-banner hover-link" onClick={() => navigate("/")}>
          Social Media
        </h2>
        <div className="right-side">
          <div
            className="profile hover-link"
            onClick={() => navigate(`/profile/${userProfile?._id}`)}
          >
            <Avatar src={userProfile?.avatar?.url} />
          </div>
          <div className="logout hover-link">
            <AiOutlineLogout />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
