import topper from "@/models/topper";
import mongoose from "mongoose";
import connectDb from "@/middleware/mongoose";
import getRateLimitMiddlewares from "@/middleware/RateLimiting";
import applyMiddleware from "@/middleware/applyMiddleware";
import { NextResponse } from "next/server";

export const revalidate = 0;
export async function POST(req) {
  try {
    const body = await req.json();

    await mongoose.connect(process.env.MONGO_URI);
    
    const toppers = await topper.findOne({ slug: body.slug });

    return NextResponse.json({ toppers }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}
