import QuizUsers from "@/models/QuizUser";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const revalidate = 0;
export async function POST(req, context) {
  try {
    const fields = req.nextUrl.searchParams;
    const note = fields.get("note");
    const reqBody = await req.json();
    await mongoose.connect(process.env.MONGO_URI);
    let res;

    if (note) {
      res = await QuizUsers.updateOne(
        { _id: reqBody.userId, "questions.questionId": reqBody.questionId },
        {
          $set: { "questions.$.note": reqBody.note },
        }
      );
    } else {
      res = await QuizUsers.findByIdAndUpdate(reqBody.userId, {
        $push: { questions: reqBody.data },
      });
    }
    return NextResponse.json({ res }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}
