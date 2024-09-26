import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import QuizUsers from "@/models/QuizUser";
import mongoose from "mongoose";

export const revalidate = 0;
export async function POST(req, context) {
  try {
    const reqBody = await req.json();

    console.log("🚀 ~ POST ~ id :", reqBody);
    await mongoose.connect(process.env.MONGO_URI);

    const res = await QuizUsers.findByIdAndUpdate(reqBody.id, reqBody.data, {
      new: true,
    });
    return NextResponse.json({ res }, { status: 200 });

    const transport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.Quiz_MAILER_USER,
        pass: process.env.Quiz_MAILER_PASSWORD,
      },
    });
    const mailOptions = {
      from: "skptrulyweb@gmail.com",
      to: res.email,
      subject: "Register for the Course",
      text: "Enjoy Your course",
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return NextResponse.json({ mailresponse }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}
