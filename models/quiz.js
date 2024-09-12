import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Types.ObjectId, auto: true },
    link: { type: String },
    text: { type: String },
    options: { type: [String], default: [] },
    correctOption: { type: String },
    solutionTextmain: { type: String },
  },
  {
    timestamps: true,
  }
);

const quizSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      auto: true,
    },
    link: {
      type: String,
    },
    questions: { type: [questionSchema], default: [] },
  },
  {
    timestamps: true,
  }
);
mongoose.models = {};
export default mongoose.model("Quiz", quizSchema);
