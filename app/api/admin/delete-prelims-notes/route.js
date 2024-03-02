import mongoose from "mongoose";
import { NextResponse } from "next/server";
import userActivity from "@/models/userActivity";
import subject from "@/models/subject";
import topic from "@/models/topic";
import prelimsNotes from "@/models/prelimsNotes";
export const revalidate = 0;
export async function POST(req) {
    try {
        const data = await req.json();
        await mongoose.connect(process.env.MONGO_URI);
        await prelimsNotes.findByIdAndDelete(data._id)
        await topic.findByIdAndDelete(data.topic)
        return NextResponse.json(
            { message: "Prelims notes deleted" },
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
