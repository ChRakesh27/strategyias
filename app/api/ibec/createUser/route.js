import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import IbecUsers from "@/models/ibecUser";
import mongoose from "mongoose";

export const revalidate = 0;
export async function POST(req, context) {
  try {
    const reqBody = await req.json();

    await mongoose.connect(process.env.MONGO_URI);

    const res = await IbecUsers.create(reqBody);
    //-----------
    // return NextResponse.json(res, { status: 200 });

    const transport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.Quiz_MAILER_USER,
        pass: process.env.Quiz_MAILER_PASSWORD,
      },
    });

    const mailOptions = {
      from: "skptrulyweb@gmail.com",
      to: "Saurabh.pandeyait@gmail.com",
      // to: "chipparakesh01@gmail.com",
      subject: "User Creation for Purchasing IBEC Topper Copies",
      text: "Here is the User Creation for Purchasing IBEC Topper Copies.",
      html: `<p>
      Name: <b>${reqBody.userName}</b><br>
      Email Id: <b>${reqBody.email}</b><br>
      Phone: <b>${reqBody.phone}</b><br>
      Type of Copy: <b>${reqBody.typeOfCopy}</b><br>
      <br>
      <br>
      Give Permission : <a href="https://strategyias.com/admin/ibec-Users">Click Here</a>
      </p>`,
      // attachments: [{ path: reqBody.paymentImg }],
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}
