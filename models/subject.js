import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  topic: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
    },
  ],
  from: {
    type: String,
  },
});

mongoose.models = {};
export default mongoose.model("Subject", subjectSchema);
