import mongoose from "mongoose";

const quizUserSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Types.ObjectId, auto: true },
    userEmail: {
      type: String,
    },
  },
  { timestamps: true }
);
mongoose.models = {};
const QuizUser = mongoose.model("QuizUser", quizUserSchema);
export default QuizUser;
