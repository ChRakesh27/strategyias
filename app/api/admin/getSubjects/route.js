import topper from "@/models/topper";
import mongoose from "mongoose";
import connectDb from "@/middleware/mongoose";
import getRateLimitMiddlewares from "@/middleware/RateLimiting";
import applyMiddleware from "@/middleware/applyMiddleware";
import { NextResponse } from "next/server";
import topic from "@/models/topic";
import subject from "@/models/subject";

export const revalidate = 0;
export async function GET(req) {
  try {
    const fields = req.nextUrl.searchParams;
    const from = fields.get("from");
    await mongoose.connect(process.env.MONGO_URI);

    const subjects = await subject.find({ from: from });

    return NextResponse.json({ subjects }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}
