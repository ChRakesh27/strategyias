import mongoose from "mongoose";

const pyqsSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  option1: {
    type: String,
    required: true,
  },
  option2: {
    type: String,
    required: true,
  },
  option3: {
    type: String,
    required: true,
  },

  option4: {
    type: String,
    required: true,
  },

  solution: {
    type: String,
    required: true,
  },

  correctOption: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});
mongoose.models = {};
export default mongoose.model("Pyqs", pyqsSchema);
