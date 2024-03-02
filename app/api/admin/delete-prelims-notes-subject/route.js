import mongoose from "mongoose";
import { NextResponse } from "next/server";
import userActivity from "@/models/userActivity";
import subject from "@/models/subject";
import topic from "@/models/topic";
import prelimsNotes from "@/models/prelimsNotes";
export const revalidate = 0;
export async function POST(req) {
    try {
        const delSub = await req.json();
        await mongoose.connect(process.env.MONGO_URI);
        for (let topicId of delSub.topic) {
            await topic.findByIdAndDelete(topicId)
        }
        const res = await prelimsNotes.find({ subject: delSub._id })
        for (let item of res) {
            await prelimsNotes.findByIdAndDelete(item._id)
        }
        await subject.findByIdAndDelete(delSub._id)
        return NextResponse.json(
            { message: "New Prelims notes deleted" },
            { status: 200 }
        );
    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
