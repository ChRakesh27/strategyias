import Static from "@/models/static";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const revalidate = 0;
export async function GET(req, context) {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const fields = req.nextUrl.searchParams;
    const id = fields.get("id");
    console.log("🚀 ~ GET ~ id :", id);
    const res = await Static.findByIdAndDelete(id, { new: true });
    console.log("🚀 ~ POST ~ res:", res);

    return NextResponse.json({ res }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}
