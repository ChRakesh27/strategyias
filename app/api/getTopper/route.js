import topper from "@/models/topper";
import mongoose from "mongoose";
import connectDb from "@/middleware/mongoose";
import getRateLimitMiddlewares from "@/middleware/RateLimiting";
import applyMiddleware from "@/middleware/applyMiddleware";
import { NextResponse } from "next/server";

export const revalidate = 0;
export async function GET(req, context) {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const fields = req.nextUrl.searchParams;
    
    const count = fields.get("count");
    const searchFields = fields.get("fields");
    let select = {};
    if (searchFields) {
      searchFields.split(",").forEach((field) => {
        select[field.trim()] = 1;
      });
    }

    const toppers = count
      ? await topper.aggregate([
          { $sample: { size: parseInt(count) } },
          { $project: select },
        ])
      : await topper.find({}, select);
    return NextResponse.json({ toppers }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}
