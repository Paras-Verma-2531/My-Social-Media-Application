import React from "react";
import Avatar from "../avatar/Avatar";
import { useNavigate } from "react-router-dom";
import "./Navbar.scss";
function Navbar() {
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
            onClick={() => navigate("/profile/dummy")}
          >
            <Avatar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
