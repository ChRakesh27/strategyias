import quiz from "@/models/quiz";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const revalidate = 0;
export async function GET(req, context) {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const fields = req.nextUrl.searchParams;
    const offset = fields.get("offset");

    const res = await quiz.findOne({}, null, {
      skip: +offset,
    });

    return NextResponse.json({ res }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}
