import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    slug: {
      type: String,
    },
    content: {
      type: String,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
    },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
    },
    subTopics: {
      type: String,
    },
    tags: {
      type: String,
    },
    faqs: [
      {
        title: {
          type: String,
        },
        solution: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
mongoose.models = {};
export default mongoose.model("article", articleSchema);
