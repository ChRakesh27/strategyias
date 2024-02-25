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
      const { title, content, slug, subjectId, topicId, faqs, subjectName, topicName, subTopics, tags } = data;
  
      await mongoose.connect(process.env.MONGO_URI);
  
      
      const note = await prelimsNotes.findOne({ slug: slug });
  
      if (!note) {
        
        return NextResponse.json({ message: "Prelims note not found" }, { status: 404 });
      }
  
   
      note.title = title;
      note.content = content;
    
      note.faqs = faqs;
      note.subjectName = subjectName;
      note.topicName = topicName;
      note.subTopics = subTopics;
      note.tags = tags;
  
      // Save the updated note
      await note.save();
  
      return NextResponse.json({ note }, { status: 200 });
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
  }