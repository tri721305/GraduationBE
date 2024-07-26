import mongoose from "mongoose";

const planSchema = mongoose.Schema({
  location: String,
  name: String,
  creator: String,
  selectedFile: String,
  tags: [String],
  startDate: {
    type: Date,
    default: new Date(),
  },
  likes: {
    type: [String],
    default: [],
  },
  endDate: {
    type: Date,
    default: new Date(),
  },
  comments: { type: [Object], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var PlanMessage = mongoose.model("PlanMessage", planSchema);

export default PlanMessage;
