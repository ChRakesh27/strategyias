import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  from: {
    type: String,
  },
});

mongoose.models = {};
export default mongoose.model("Topic", topicSchema);
