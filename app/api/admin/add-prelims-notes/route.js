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

    let {
      title,
      content,
      slug,
      subjectId,
      topicId,
      faq,
      subjectName,
      topicName,
      subTopics,
      tags,
    } = data;

    subjectName = subjectName.replace(/\s+/g, "-");
    topicName = topicName.replace(/\s+/g, "-");
    if (!slug) {
      slug = `${subjectName}/${topicName}`;
    }

    let newNotes;
    if (subjectId) {
      let subjectExists = await subject.findOne({ subjectId });

      if (topicId) {
        let topicExists = await topic.findOne({ topicId });
        newNotes = new prelimsNotes({
          title: title,
          slug: slug,
          content: content,
          subject: subjectId,
          topic: topicId,
          subTopics: subTopics,
          tags: tags,
          faqs: faq,
        });
      } else {
        let newTopic = new topic({
          name: topicName,
        });
        await newTopic.save();
        newNotes = new prelimsNotes({
          title: title,
          slug: slug,
          content: content,
          subject: subjectId,
          topic: newTopic._id,
          subTopics: subTopics,
          tags: tags,
          faqs: faq,
        });
      }
    } else {
      let newTopic = new topic({
        name: topicName,
      });
      await newTopic.save();
      let newSubject = new subject({
        name: subjectName,
        topic: newTopic._id,
      });
      await newSubject.save();
      newNotes = new prelimsNotes({
        title: title,
        slug: slug,
        content: content,
        subject: newSubject._id,
        topic: newTopic._id,
        subTopics: subTopics,
        tags: tags,
        faqs: faq,
      });
    }

    await newNotes.save();
    return NextResponse.json(
      { message: "New Prelims notes saved" },
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
