import userActivity from "@/models/userActivity";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
export const revalidate = 0;
export async function GET() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    let useract = await userActivity.find();

    return NextResponse.json({ userAct: useract }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "internal server issue" },
      { status: 500 }
    );
  }
}
