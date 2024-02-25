import connectDb from "@/middleware/mongoose";
import topper from "@/models/topper";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { S3Client } from "@aws-sdk/client-s3";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

export async function POST(req) {
  try {
    const body = await req.json();

    const topperId = body.topperId;
    const profileImage = body.profileImage;
    const params = {
      Bucket: bucketName,
      Key: profileImage,
    };
    const command = new DeleteObjectCommand(params);
    await s3.send(command);
    mongoose.connect(process.env.MONGO_URI);
    const deletedDoc = await topper.findByIdAndDelete(topperId);
    if (!deletedDoc) {
      console.log(`Document with ID ${topperId} not found.`);
      return NextResponse.json(
        { message: "topper not found" },
        { status: 404 }
      );
    } else {
      console.log(`Document with ID ${topperId} has been deleted.`);
      return NextResponse.json(
        { message: "Deleted topper successfully" },
        { status: 200 }
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Internal issue" }, { status: 500 });
  }
}

// const handler = async (req, res) => {
//   try {
//     const { topperId, profileImage } = req.body;
//     console.log("topper", topperId);
//     console.log("image", profileImage);
//     const params = {
//       Bucket: bucketName,
//       Key: profileImage,
//     };
//     const command = new DeleteObjectCommand(params);
//     await s3.send(command);

//     const deletedDoc = await topper.findByIdAndDelete(topperId);

//     if (!deletedDoc) {
//       console.log(`Document with ID ${topperId} not found.`);
//       return res.status(200).json({ message: "not found" });
//     } else {
//       console.log(`Document with ID ${topperId} has been deleted.`);
//       return res.status(200).json({ message: "deleted topper" });
//     }
//     return res.status(200).json({ success: "done" });
//   } catch (err) {
//     return res.status(500).json({ err: err.message }, { status: 500 });
//   }
// };
// export default connectDb(handler);
