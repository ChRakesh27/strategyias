import Answer from "@/models/answer";
import Paper from "@/models/paper";
import Topic from "@/models/topic";
import Subtopic from "@/models/subtopic";
import connectDb from "@/middleware/mongoose";
import mongoose from "mongoose";
import topic from "@/models/topic";
import subtopic from "@/models/subtopic";
import topper from "@/models/topper";
import sharp from "sharp";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    const body = await req.json();
    await mongoose.connect(process.env.MONGO_URI);

    await topper.findByIdAndUpdate(body.writtenBy, {
      essayLinks: body.essayLinks,
      gs1Links: body.gs1Links,
      gs2Links: body.gs2Links,
      gs3Links: body.gs3Links,
      gs4Links: body.gs4Links,
      optional1Links: body.optional1Links,
      optional2Links: body.optional2Links,
    });

    return NextResponse.json({ message: "Saved  links" }, { status: 200 });
  } catch (err) {
    console.error("Error in handler:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// const handler = async (req, res) => {
//   if (req.method == "POST") {
//     try {
//       const { writtenBy, essayLinks, gs1Links, gs2Links, gs3Links, gs4Links } =
//         req.body;
//       await topper.findByIdAndUpdate(writtenBy, {
//         essayLinks: essayLinks,
//         gs1Links: gs1Links,
//         gs2Links: gs2Links,
//         gs3Links: gs3Links,
//         gs4Links: gs4Links,
//       });

//       res.status(200).json({ message: "success" });
//     } catch (err) {
//       console.error("Error in handler:", err);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   } else {
//     res.status(400).json({ message: "bad request" });
//   }
// };
// export default connectDb(handler);
