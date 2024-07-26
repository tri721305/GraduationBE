import mongoose from "mongoose";
const Schema = mongoose.Schema;
const postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      trim: true,
    },
    body: {
      feelings: {
        type: String,
        trim: true,
      },
      with: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      at: {
        type: String,
        trim: true,
      },
      date: String,
    },
    image: String,
    isProfilePost: {
      type: Boolean,
      default: false,
    },

    profilePostData: {
      coverImage: String,
      profileImage: String,
    },

    privacy: {
      type: String,
      enum: ["Only me", "Public"],
      default: "Public",
    },

    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    hearts: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

var Post = mongoose.model("Post", postSchema);
export default Post;
