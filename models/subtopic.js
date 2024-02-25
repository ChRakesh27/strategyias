import mongoose from "mongoose";

const subtopicSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});
mongoose.models = {};
export default mongoose.model("Subtopic", subtopicSchema);
