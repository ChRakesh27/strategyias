import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    testCode: {
      type: String,
      required: true,
    },
    questionNumber: {
      type: Number,
      required: true,
    },
    questionText: {
      type: String,
      required: true,
    },
    answerText: {
      type: String,
    },
    answerImages: [
      {
        type: String,
        required: true,
      },
    ],
    writtenBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topper",
      required: true,
    },
    paper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Paper",
    },
    topic: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
      },
    ],
    subTopic: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subtopic",
      },
    ],
  },
  {
    timestamps: true,
  }
);
mongoose.models = {};
export default mongoose.model("Answer", answerSchema);
