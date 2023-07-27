import React from "react";
import "./UpdateProfile.scss";
import userImg from '../../assets/user.png'
function UpdateProfile() {
  return (
    <div className="updateProfile">
      <div className="container">
        <div className="left-part">
            <img src={userImg} alt="user-profile" className="user-img" />
        </div>
        <div className="right-part">
            <form>
                <input type="text" placeholder="Your name"
                className="input"/>
                <textarea className="input" placeholder="Your bio"></textarea>
                <input type="submit" className="btn btn-primary"/>
            </form>
            <button className="btn btn-secondary">Delete Account</button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
