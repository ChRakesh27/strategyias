import mongoose from "mongoose";
import { NextResponse } from "next/server";
import article from "@/models/article";
export const revalidate = 0;
export async function POST(req) {
  try {
    const data = await req.json();
    const { subject, topic } = data;

    await mongoose.connect(process.env.MONGO_URI);
    let note = [];
    if (topic) {
      // let slug = `${subject}/${topic}`;
      note = await article.find({ subject, topic });
    } else {
      note = await article.find({ subject });
    }

    return NextResponse.json({ note }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
