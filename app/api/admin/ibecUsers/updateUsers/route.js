import { NextResponse } from "next/server";
import IbecUsers from "@/models/ibecUser";
import mongoose from "mongoose";

export const revalidate = 0;
export async function POST(req, context) {
  try {
    const reqBody = await req.json();

    await mongoose.connect(process.env.MONGO_URI);

    const res = await IbecUsers.findByIdAndUpdate(reqBody.id, reqBody.data, {
      new: true,
    });
    return NextResponse.json({ res }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}
