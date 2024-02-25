import Answer from "@/models/answer";
import pyqs from "@/models/pyqs";
import connectDb from "@/middleware/mongoose";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
export async function POST(req) {
  try {
    const data = await req.json();
    await mongoose.connect(process.env.MONGO_URI);
    let q = new pyqs({
      question: data.question,
      option1: data.option1,
      option2: data.option2,
      option3: data.option3,
      option4: data.option4,
      solution: data.solution,
      correctOption: data.correctOption,
    });

    await q.save();

    return NextResponse.json({ message: "Saved pyqs" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// const handler = async (req, res) => {
//   if (req.method == "POST") {
//     try {
//       let q = new pyqs({
//         question: req.body.question,
//         option1: req.body.option1,
//         option2: req.body.option2,
//         option3: req.body.option3,
//         option4: req.body.option4,
//         solution: req.body.solution,
//         correctOption: req.body.correctOption,
//       });

//       await q.save();

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
