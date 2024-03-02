import mongoose from "mongoose";
import { NextResponse } from "next/server";
import userActivity from "@/models/userActivity";
import subject from "@/models/subject";
import topic from "@/models/topic";
import prelimsNotes from "@/models/prelimsNotes";
export const revalidate = 0;
export async function POST(req) {
    try {
        const { delSub, topicId } = await req.json();
        console.log("🚀 ~ data-DB:", delSub, topicId)
        await mongoose.connect(process.env.MONGO_URI);

        await subject.findByIdAndUpdate(delSub._id, delSub);

        const res = await prelimsNotes.find({ topic: topicId })
        for (let item of res) {
            await prelimsNotes.findByIdAndDelete(item._id)
        }
        await topic.findByIdAndDelete(topicId);
        return NextResponse.json(
            { message: "New Prelims topic notes deleted" },
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
