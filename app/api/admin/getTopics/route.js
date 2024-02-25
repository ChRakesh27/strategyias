import topper from "@/models/topper";
import mongoose from "mongoose";
import connectDb from "@/middleware/mongoose";
import getRateLimitMiddlewares from "@/middleware/RateLimiting";
import applyMiddleware from "@/middleware/applyMiddleware";
import { NextResponse } from "next/server";
import topic from "@/models/topic";
import subject from "@/models/subject";

export const revalidate = 0;
export async function POST(req) {
  try {
    const body = await req.json();
    const { subjectId } = body;
    await mongoose.connect(process.env.MONGO_URI);
    const sub = await subject.findById(subjectId).populate("topic");
    if (!sub) {
      console.log("Subject not found");
      return null;
    }
    

    const topics = sub.topic;
   

    return NextResponse.json({ topics}, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}
