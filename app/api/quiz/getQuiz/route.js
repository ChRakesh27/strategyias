import Static from "@/models/static";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import QuizUsers from "@/models/QuizUser";

export const revalidate = 0;
export async function GET(req, context) {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const fields = req.nextUrl.searchParams;
    const userId = fields.get("userId");
    let res = [];

    const quizzes = {
      TS_10QD: 10,
      TS_50QD: 50,
      TS_100QD: 100,
      CA_DCA: 10,
      CA_10QD: 10,
    };

    const userDetails = await QuizUsers.findOne(
      { _id: userId, status: { $in: ["accept", "pending"] } },
      { "questions.questionId": 1, course: 1 }
    );

    const answeredQuestions = userDetails.questions.map(
      (ele) => ele.questionId
    );

    res = await Static.aggregate([
      { $match: { _id: { $nin: answeredQuestions } } },
      { $sample: { size: quizzes[userDetails.course.id] } },
    ]);

    // if (quizzes[quizType]) {
    // const userDetails = await QuizUsers.findOne(
    //   { _id: userId },
    //   { "questions.questionId": 1 }
    // );

    // res = await Static.aggregate([
    //   { $match: { _id: { $nin: [] } } },
    //   { $sample: { size: quizzes[quizType] } },
    // ]);
    // } else {
    //   // res = await Static.find({}, null, {
    //   //   limit: quizzes[quizType],
    //   //   skip: quizzes[quizType] * 0,
    //   // });
    // }

    return NextResponse.json({ res }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}
