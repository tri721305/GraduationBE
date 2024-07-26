// const { Schema, model, default: mongoose } = require("mongoose");
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;

const notificationSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// module.exports = model("Notification", notificationSchema);
export default mongoose.model("Notification", notificationSchema);
