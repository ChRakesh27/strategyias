import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const revalidate = 0;
export async function POST(req, context) {
  try {
    const reqBody = await req.json();
    const image = reqBody.image;
    const transport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "",
        pass: "",
      },
    });
    const mailOptions = {
      from: "",
      to: "",
      subject: "Register for the Course",
      text: "Here is the payment for register course.",
      attachments: [{ path: image }],
    };
    const mailresponse = await transport.sendMail(mailOptions);
    return NextResponse.json({ mailresponse, mailOptions }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}
