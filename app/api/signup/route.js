import connectDb from "@/middleware/mongoose";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";
export async function POST(req, res) {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const reqBody = await req.json();
   
    const { username, email, password } = reqBody;
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { message: "user already exists" },
        { status: 400 }
      );
    }

    //hash password

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      userName: username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    return NextResponse.json({ message: "saved the user" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}

// export default async function handler(req, res) {
//   const middlewares = getRateLimitMiddlewares({ limit: 10 }).map(
//     applyMiddleware
//   );

//   if (req.method === "POST") {
//     try {
//       await Promise.all(middlewares.map((middleware) => middleware(req, res)));
//     } catch {
//       return response.status(429).send("Too Many Requests");
//     }
//     try {
//       const reqBody = await req.body;
//       const { username, email, password } = reqBody;

//       // check if user already exist

//       const user = await User.findOne({ email });

//       if (user) {
//         res.status(400).json({ message: "User already exists" });
//       }

//       //hash password

//       const salt = await bcryptjs.genSalt(10);
//       const hashedPassword = await bcryptjs.hash(password, salt);

//       const newUser = new User({
//         userName: username,
//         email,
//         password: hashedPassword,
//       });
//       const savedUser = await newUser.save();

//       return res.status(200).json({
//         message: "User Created ",
//         success: true,
//       });
//     } catch (err) {
//       return res.status(500).json({ err: err.message }, { status: 500 });
//     }
//   }
// }
