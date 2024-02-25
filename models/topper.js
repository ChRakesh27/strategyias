import mongoose from "mongoose";

const topperSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    rank: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    gs1marks: {
      type: Number,
      required: true,
    },

    gs2marks: {
      type: Number,
      required: true,
    },

    gs3marks: {
      type: Number,
      required: true,
    },

    gs4marks: {
      type: Number,
      required: true,
    },
    essayMarks: {
      type: Number,
      required: true,
    },
    prelimsScoreGs: {
      type: Number,
    },
    prelimsScoreCsat: {
      type: Number,
    },
    optionalSub: {
      type: String,
      required: true,
    },
    optional1Marks: {
      type: Number,
      required: true,
    },
    optional2Marks: {
      type: Number,
      required: true,
    },
    Remarks: {
      type: String,
    },
    interviewMarks: {
      type: Number,
      required: true,
    },
    writtenMarks: {
      type: Number,
      required: true,
    },
    Answers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer",
      },
    ],
    ProfileImage: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    essayLinks: [
      {
        type: String,
      },
    ],
    gs1Links: [
      {
        type: String,
      },
    ],
    gs2Links: [
      {
        type: String,
      },
    ],
    gs3Links: [
      {
        type: String,
      },
    ],
    gs4Links: [
      {
        type: String,
      },
    ],
    optional1Links: [
      {
        type: String,
      },
    ],
    optional2Links: [
      {
        type: String,
      },
    ],
    slug: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

topperSchema.virtual("fullname").get(function () {
  return this.firstname + " " + this.lastname;
});
mongoose.models = {};
export default mongoose.model("Topper", topperSchema);
