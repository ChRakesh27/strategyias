import topper from "@/models/topper";
import connectDb from "@/middleware/mongoose";
import multer from "multer";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

import crypto from "crypto";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import User from "@/models/user";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

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
  const data = await req.formData();

  const file = data.get("profileImage");
  try {
    if (!file) {
      return NextResponse.json({ message: "image not found" }, { status: 200 });
    }

    const byteData = await file.arrayBuffer();
    const buffer = Buffer.from(byteData);
    const compressedBuffer = await sharp(buffer)
      .resize({ height: 250, width: 250, fit: "contain" })
      .toBuffer();

    const imageName = randomImageName();
    const params = {
      Bucket: bucketName,
      Key: imageName,
      Body: compressedBuffer,
      ContentType: file.type,
    };
    const command = new PutObjectCommand(params);
    await s3.send(command);
    const url = `https://${bucketName}.s3.amazonaws.com/${imageName}`;

    const slug = `${data.get("firstname").toLowerCase()}-${data
      .get("lastname")
      .toLowerCase()}-rank-${parseInt(data.get("rank"))}-${parseInt(
      data.get("year")
    )}`;
    await mongoose.connect(process.env.MONGO_URI);
    let newTopper = new topper({
      metaDescription: data.get("metaDescription"),
      firstname: data.get("firstname"),
      lastname: data.get("lastname"),
      rank: parseInt(data.get("rank")),
      year: parseInt(data.get("year")),
      gs1marks: parseInt(data.get("gs1marks")),
      gs2marks: parseInt(data.get("gs2marks")),
      gs3marks: parseInt(data.get("gs3marks")),
      gs4marks: parseInt(data.get("gs4marks")),
      essayMarks: parseInt(data.get("essayMarks")),
      prelimsScoreGs: parseInt(data.get("prelimsScoreGs")),
      prelimsScoreCsat: parseInt(data.get("prelimsScoreCsat")),
      ProfileImage: imageName,
      optionalSub: data.get("optionalSub"),
      interviewMarks: parseInt(data.get("interviewMarks")),
      writtenMarks: parseInt(data.get("writtenMarks")),
      optional1Marks: parseInt(data.get("optional1Marks")),
      optional2Marks: parseInt(data.get("optional2Marks")),
      Remarks: data.get("Remarks"),
      imageUrl: url,
      slug: slug,
    });
    const savedTopper = await newTopper.save();

    return NextResponse.json(
      { message: "successfully saved topper" },
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
