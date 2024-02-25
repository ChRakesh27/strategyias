import mongoose from "mongoose";

const paperSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  paperTopics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
    },
  ],
});

mongoose.models = {};
export default mongoose.model("Paper", paperSchema);
