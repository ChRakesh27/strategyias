import mongoose from "mongoose";

// const questionSchema = new mongoose.Schema(
//   {
//     _id: { type: mongoose.Types.ObjectId, auto: true },
//     link: { type: String },
//     text: { type: String },
//     options: { type: [String], default: [] },
//     correctOption: { type: String },
//     solutionTextmain: { type: String },
//   },
//   {
//     timestamps: true,
//   }
// );

const currentSchema = new mongoose.Schema(
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
const Current = mongoose.model("Current", currentSchema);
export default Current;
