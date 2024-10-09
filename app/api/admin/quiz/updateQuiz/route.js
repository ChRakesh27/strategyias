import Static from "@/models/static";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const revalidate = 0;
export async function POST(req, context) {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const reqBody = await req.json();
    const res = await Static.findByIdAndUpdate(
      reqBody._id,
      {
        subject: reqBody.subject,
      },
      { new: true }
    );

    return NextResponse.json({ res }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}
