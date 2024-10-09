import QuizUsers from "@/models/QuizUser";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const revalidate = 0;
export async function GET(req, context) {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const fields = req.nextUrl.searchParams;
    const email = fields.get("email");
    const courseId = fields.get("courseId");
    const date = new Date();
    let res;
    if (courseId) {
      res = await QuizUsers.findOne(
        {
          email,
          "course.id": courseId,
          status: { $in: ["accept", "pending"] },
          expireAt: { $gt: date.toISOString() },
          // expireAt: { $gt: ISODate(date.toISOString()) },
        },
        { course: 1, questions: 1 }
      );
    } else {
      res = await QuizUsers.find(
        {
          email,
          status: { $in: ["accept", "pending"] },
          expireAt: { $gt: date.toISOString() },
          // expireAt: { $gt: ISODate(date.toISOString()) },
        },
        { course: 1 }
      );
    }

    return NextResponse.json({ res }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}
