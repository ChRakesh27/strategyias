import mongoose from "mongoose";

const staticSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Types.ObjectId, auto: true },
    text: { type: String },
    options: { type: [String], default: [] },
    correctOption: { type: String },
    solutionTextmain: { type: String },
  },
  {
    timestamps: true,
  }
);
mongoose.models = {};
const Static = mongoose.model("Static", staticSchema);
export default Static;
