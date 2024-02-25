import topper from "@/models/topper";
import mongoose from "mongoose";
import connectDb from "@/middleware/mongoose";
import getRateLimitMiddlewares from "@/middleware/RateLimiting";
import applyMiddleware from "@/middleware/applyMiddleware";
import { NextResponse } from "next/server";
// const middlewares = getRateLimitMiddlewares({ limit: 10 }).map(applyMiddleware);

// const handler = async (req, res) => {
//   try {
//     await Promise.all(
//       middlewares.map((middleware) => middleware(req, res))
//     );
//   } catch {
//     return response.status(429).send("Too Many Requests");
//   }

// };

export async function POST(req) {
  // try {
  //   await Promise.all(middlewares.map((middleware) => middleware(req, res)));
  // } catch {
  //   return new Response(JSON.stringify({ message: "Too many requests" } ,{status: 500}));
  // }
  const body = await req.json();
  await mongoose.connect(process.env.MONGO_URI);
 
  const toppersData = await topper.findOne({
    rank: body.parsedRank,
    year: body.parsedYear,
  });

  return NextResponse.json({ toppers: toppersData }, { status: 200 });
}
