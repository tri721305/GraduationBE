// const { Schema, model, default: mongoose } = require("mongoose");
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    body: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

// var Chat = mongoose.model("Chat", chatSchema);
// module.exports = model("Chat", chatSchema);
export default mongoose.model("Chat", chatSchema);
