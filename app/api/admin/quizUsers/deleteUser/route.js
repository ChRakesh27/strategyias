import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import QuizUsers from "@/models/QuizUser";
import mongoose from "mongoose";

export const revalidate = 0;
export async function POST(req, context) {
  try {
    const reqBody = await req.json();

    await mongoose.connect(process.env.MONGO_URI);

    const res = await QuizUsers.findByIdAndDelete(reqBody.id);
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
      to: "chipparakesh01@gmail.com",
      subject: "Register for the Course",
      text: "Here is the payment for register course.",
      html: `<p>
      Name: <b>${reqBody.userName}</b><br>
      Email Id: <b>${reqBody.email}</b><br>
      Phone: <b>${reqBody.phone}</b><br>
      Target Year: <b>${reqBody.course.targetYear}</b><br>
      Course Name: <b>${reqBody.course.name}</b><br>
      <br>
      <br>
      Give Permission : <a href="https://strategyias.com/admin/user-permission">Click Here</a>
      </p>`,
      attachments: [{ path: reqBody.paymentImg }],
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return NextResponse.json({ mailresponse }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}
