import mongoose from "mongoose";
import { NextResponse } from "next/server";
import topic from "@/models/topic";
import article from "@/models/article";
export const revalidate = 0;
export async function POST(req) {
  try {
    const data = await req.json();
    await mongoose.connect(process.env.MONGO_URI);
    await article.findByIdAndDelete(data._id);
    await topic.findByIdAndDelete(data.topic);
    return NextResponse.json({ message: "Article deleted" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
