// const { Schema, model } = require("mongoose");
import mongoose from "mongoose";
import pkg from "mongoose";
const Schema = mongoose.Schema;
const commentSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  body: {
    image: String,
    text: {
      type: String,
      trim: true,
    },
  },

  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

// var Comment = mongoose.model("Comment", commentSchema)
export default mongoose.model("Comment", commentSchema);
