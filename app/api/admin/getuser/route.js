import User from "@/models/user";
import mongoose from "mongoose";

import { NextResponse } from "next/server";
export const revalidate = 0;
export async function GET(req) {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const user = await User.find().select("-password");
    return NextResponse.json(
      {
        message: "Users found",
        data: user,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "Internal error",
      },
      { status: 500 }
    );
  }
}
