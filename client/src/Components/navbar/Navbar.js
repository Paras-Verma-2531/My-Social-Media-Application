import React, { useRef, useState } from "react";
import Avatar from "../avatar/Avatar";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import LoadingBar from "react-top-loading-bar";
import "./Navbar.scss";
function Navbar() {
  const loadingRef = useRef(null);
  const [loading, setLoading] = useState(false);
  function toogleLoadingBar() {
    if (loading) {
      setLoading(false);
      loadingRef.current.complete();
    } else {
      setLoading(true);
      loadingRef.current.continuousStart();
    }
  }
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
          <div className="logout hover-link" onClick={toogleLoadingBar}>
            <LoadingBar color="#4db4f8" ref={loadingRef} />
            <AiOutlineLogout />
          </div>
        </div>
      </div>
    </div>
  );
} 

export default Navbar;
