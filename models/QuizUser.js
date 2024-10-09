import mongoose from "mongoose";

const quizUserSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Types.ObjectId, auto: true },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    paymentImg: {
      type: String,
      required: true,
    },
    course: {
      type: Object,
      required: true,
    },
    registerAt: {
      type: Date,
      default: new Date().toISOString(),
    },
    expireAt: {
      type: Date,
    },
    status: {
      type: String,
      default: "pending",
    },
    questions: {
      type: [Object],
      default: [],
    },
  },
  { timestamps: true }
);
mongoose.models = {};
const QuizUsers = mongoose.model("QuizUser", quizUserSchema);
export default QuizUsers;
