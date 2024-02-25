import mongoose from "mongoose";

const apiquestionSchema = new mongoose.Schema({
  setId: {
    type: Number,
  },
  questions: [
    {
      type: String,
    },
  ],
});

const pageSchema = new mongoose.Schema({
  pageId: {
    type: Number,
    required: true,
    unique: true,
  },
  questions: [apiquestionSchema],
});
mongoose.models = {};
export default mongoose.model("Page", pageSchema);
