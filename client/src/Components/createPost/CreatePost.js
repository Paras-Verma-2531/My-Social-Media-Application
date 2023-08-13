import React, { useState } from "react";
import Avatar from "../avatar/Avatar";
import "./CreatePost.scss";
import { BsCardImage } from "react-icons/bs";
import { axiosClient } from "../../Utils/axiosClient";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slice/appConfig";
function CreatePost() {
  const [postImg, setPostImg] = useState("");
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch();
  //method to handle Submit
  async function handlePostSubmit() {
    try {
      dispatch(setLoading(true));
      const result = await axiosClient.post("/post", {
        caption,
        postImg,
      });
      console.log("post done ", result);
    } catch (err) {
    } finally {
      dispatch(setLoading(false));
      setCaption("");
      setPostImg("");
    }
  }
  //method to handle post Image:
  function handleInputImage(e) {
    //fileReader to read file and allow to show on profile pic as well
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE)
        setPostImg(fileReader.result);
    };
  }
  return (
    <div className="createPost">
      <div className="post-left-part">
        <Avatar />
      </div>
      <div className="post-right-part">
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="caption-input"
          placeholder="what's on your mind?"
        />
        {/* conditional rendering :: if image selected show image container */}
        {postImg && (
          <div className="img-container">
            <img src={postImg} alt="post" className="post-img" />
          </div>
        )}
        <div className="bottom-part">
          <div className="input-post-img">
            <label htmlFor="image" className="labelImage">
              <BsCardImage />
            </label>
            <input
              type="file"
              id="image"
              className="inputImage"
              accept="image/*"
              onChange={handleInputImage}
            />
          </div>
          <button className="btn btn-primary" onClick={handlePostSubmit}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
