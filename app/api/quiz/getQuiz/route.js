import Static from "@/models/static";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const revalidate = 0;
export async function GET(req, context) {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const fields = req.nextUrl.searchParams;
    const quizType = fields.get("quizType");
    const admin = fields.get("admin");
    const undo = fields.get("undo");
    let res = [];
    if (undo == "true") {
      const lastedUpdatedQuestion = await Static.findOne().sort({
        updatedAt: -1,
      });
      res = await Static.findByIdAndUpdate(
        lastedUpdatedQuestion._id,
        {
          subject: "",
        },
        { new: true }
      );
      return NextResponse.json({ res }, { status: 200 });
    }

    if (admin == "true") {
      res = await Static.findOne({ subject: "" });
      return NextResponse.json({ res }, { status: 200 });
    }

    const quizzes = {
      TS_10QD: 10,
      TS_50QD: 50,
      TS_100QD: 100,
      CA_DCA: 10,
      CA_10QD: 10,
    };
    if (quizzes[quizType]) {
      res = await Static.aggregate([
        { $match: { _id: { $nin: [] } } },
        { $sample: { size: quizzes[quizType] } },
      ]);
    } else {
      res = await Static.find({}, null, { limit: 1 });
    }

    return NextResponse.json({ res }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}
