import mongoose from "mongoose";

const userActivitySchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
mongoose.models = {};
export default mongoose.model("userActivity", userActivitySchema);
