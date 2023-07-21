// this file contains the userSchema
const mongoose = require("mongoose");
//define the Structure for the user
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  avatar: {
    publicId: String,
    url: String,
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId, //fetch the object id from db
      ref: "user",
    },
  ],
  followings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // used as reference:: should be name of the another schema
    },
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId, //fetch the object id from db
      ref: "post",
    },
  ],
});
module.exports = mongoose.model("user", userSchema);
