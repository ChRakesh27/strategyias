import mongoose from "mongoose";
import { NextResponse } from "next/server";
import userActivity from "@/models/userActivity";
export const revalidate = 0;
export async function POST(req) {
  try {
    const data = await req.json();

    await mongoose.connect(process.env.MONGO_URI);

    let userAct = new userActivity({
      userEmail: data.userEmail,
      userName: data.userName,
      message: data.message,
    });

    await userAct.save();
    return NextResponse.json(
      { message: "User activity saved" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
