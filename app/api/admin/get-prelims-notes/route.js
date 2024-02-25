import mongoose from "mongoose";
import { NextResponse } from "next/server";
import userActivity from "@/models/userActivity";
import subject from "@/models/subject";
import topic from "@/models/topic";
import prelimsNotes from "@/models/prelimsNotes";
export const revalidate = 0;
export async function POST(req) {
  try {
    const data = await req.json();
    const { subject, topic } = data;
    
    await mongoose.connect(process.env.MONGO_URI);
    let slug = `${subject}/${topic}`;
    const note = await prelimsNotes.find({ slug: slug });
   
    return NextResponse.json({ note }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
