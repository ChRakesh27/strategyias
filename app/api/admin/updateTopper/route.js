import connectDb from "@/middleware/mongoose";
import topper from "@/models/topper";

import bcryptjs from "bcryptjs";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const slug = `${body.updatedFields.firstname
      .toLowerCase()
      .replace(/\s/g, "-")}-${body.updatedFields.lastname
      .toLowerCase()
      .replace(/\s/g, "-")}-rank-${parseInt(
      body.updatedFields.rank
    )}-${parseInt(body.updatedFields.year)}`;

    await mongoose.connect(process.env.MONGO_URI);

    const updatedTopper = await topper.findByIdAndUpdate(
      body.topperId,
      { ...body.updatedFields, slug: slug },
      { new: true }
    );
    if (!updatedTopper) {
      return NextResponse.json(
        { message: "Topper not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Topper updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal server issue" },
      { status: 500 }
    );
  }
}

// const handler = async (req, res) => {
//   try {
//     if (req.method !== "POST") {
//       return res.status(405).json({ message: "Method Not Allowed" });
//     }

//     const { topperId, updatedFields } = req.body;

//     const updatedTopper = await topper.findByIdAndUpdate(
//       topperId,
//       updatedFields,
//       { new: true }
//     );

//     if (!updatedTopper) {
//       return res.status(404).json({ message: "Topper not found" });
//     }

//     return res
//       .status(200)
//       .json({ message: "Topper updated successfully", updatedTopper });
//   } catch (error) {
//     console.error("Error in updateTopper API:", error);
//     return res.status(500).json({ error: error.message });
//   }
// };
// export default connectDb(handler);
