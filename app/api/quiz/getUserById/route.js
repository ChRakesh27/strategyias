import { NextResponse } from "next/server";
import QuizUsers from "@/models/QuizUser";
import mongoose from "mongoose";

export const revalidate = 0;
export async function GET(req, context) {
  try {
    const fields = req.nextUrl.searchParams;
    const id = fields.get("id");
    await mongoose.connect(process.env.MONGO_URI);
    const res = await QuizUsers.findById(id);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.error("Internal Server Error", 500);
  }
}
