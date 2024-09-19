import Static from "@/models/static";
import Current from "@/models/current";
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
      res = await Static.aggregate([
        { $match: { _id: { $nin: [] } } },
        { $sample: { size: quizzes[quizType] } },
      ]);
    } else {
      res = await Static.findOne({});
    }

    return NextResponse.json({ res }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}
