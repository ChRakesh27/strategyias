import mongoose, { models } from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    Title: { type: String, required: true },
    QuestionText: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    Answer: {
      type: String,
      required: true,
    },
    Image: {
      type: String,
    },
    url: {
      type: String,
    },
    SubmitTime: {
      type: String,
      required: true,
    },
    Subject: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
mongoose.models = {};
export default mongoose.model("Question", questionSchema);
