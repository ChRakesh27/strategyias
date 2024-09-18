import quiz from "@/models/quiz";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const revalidate = 0;
export async function GET(req, context) {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const fields = req.nextUrl.searchParams;
    const quizType = fields.get("quizType");

    const quizzes = {
      TS_10QD: 10,
      TS_50QD: 50,
      TS_100QD: 100,
      CA_DCA: 10,
      CA_10QD: 10,
    };
    let res = [];
    if (quizzes[quizType]) {
      res = await quiz.aggregate([
        { $unwind: "$questions" },
        { $match: { "questions.id": { $nin: ["77705", "77706", "59161"] } } },
        { $sample: { size: quizzes[quizType] } },
        {
          $project: {
            _id: 1,
            title: 1,
            text: "$questions.text",
            options: "$questions.options",
            correctOption: "$questions.correctOption",
            solutionTextmain: "$questions.solutionTextmain",
            questionId: "$questions.id",
          },
        },
      ]);
    } else {
      // const res = await quiz.findOne({}, null, {
      //   skip: +offset,
      // });
      res = await quiz.findOne({});
    }

    return NextResponse.json({ res }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}
