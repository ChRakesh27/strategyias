import Static from "@/models/static";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const revalidate = 0;
export async function GET(req, context) {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const fields = req.nextUrl.searchParams;
    const undo = fields.get("undo");
    let res = [];

    if (undo == "true") {
      const lastedUpdatedQuestion = await Static.findOne().sort({
        updatedAt: -1,
      });
      res = await Static.findByIdAndUpdate(
        lastedUpdatedQuestion._id,
        {
          subject: "",
        },
        { new: true }
      );
      return NextResponse.json({ res }, { status: 200 });
    }

    res = await Static.findOne({ subject: "" });
    return NextResponse.json({ res }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}
