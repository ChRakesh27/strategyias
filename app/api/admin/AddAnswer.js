import Answer from "@/models/answer";
import Paper from "@/models/paper";
import Topic from "@/models/topic";
import Subtopic from "@/models/subtopic";
import connectDb from "@/middleware/mongoose";
import mongoose from "mongoose";
import topic from "@/models/topic";
import subtopic from "@/models/subtopic";
import topper from "@/models/topper";
import sharp from "sharp";
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      // let subtopicId = req.body.subTopicId;
      // let topicId = req.body.topicId;
      // let papId;

      // if (req.body.paperId === "") {
      //   const newSubTopic = new subtopic({ name: req.body.subtopicName });
      //   await newSubTopic.save();
      //   subtopicId = newSubTopic._id;
      //   const newTopic = new topic({
      //     name: req.body.topicName,
      //     subTopic: [subtopicId],
      //   });
      //   await newTopic.save();
      //   topicId = newTopic._id;
      //   const newPaper = new Paper({
      //     name: req.body.paper,
      //     paperTopics: [topicId],
      //   });
      //   await newPaper.save();
      //   papId = newPaper._id;
      // } else if (req.body.paperId && req.body.topicId === "") {
      //   papId = req.body.paperId;
      //   const newSubTopic = new subtopic({ name: req.body.subtopicName });
      //   await newSubTopic.save();
      //   subtopicId = newSubTopic._id;
      //   const newTopic = new topic({
      //     name: req.body.topicName,
      //     subTopic: [subtopicId],
      //   });
      //   await newTopic.save();
      //   topicId = newTopic._id;

      //   await Paper.findByIdAndUpdate(papId, {
      //     $push: { paperTopics: topicId },
      //   }).exec();
      // } else if (
      //   req.body.paperId &&
      //   req.body.topicId &&
      //   req.body.subTopicId === ""
      // ) {
      //   papId = req.body.paperId;
      //   topicId = req.body.topicId;
      //   const newSubTopic = new subtopic({ name: req.body.subtopicName });
      //   await newSubTopic.save();
      //   subtopicId = newSubTopic._id;

      //   await topic
      //     .findByIdAndUpdate(topicId, {
      //       $push: { subTopic: subtopicId },
      //     })
      //     .exec();
      // } else {
      //   papId = req.body.paperId;
      // }
      let images = req.body.answerImages;
      let ansImage = [];
      
      for (let i = 0; i < images.length; i++) {
        const startIndex = images[i].data.indexOf(",") + 1;
        const base64ImageData = images[i].data.slice(startIndex);
        const buffer = Buffer.from(base64ImageData, "base64");

        const compressedBuffer = await sharp(buffer)
          .withMetadata()
          .jpeg({ quality: 50 }) // Adjust quality as needed
          .toBuffer();

        const image64 = compressedBuffer.toString("base64");

        // Store the processed image in the ansImage array
        ansImage.push(image64);
      }

      let q = new Answer({
        testCode: req.body.testCode,
        questionNumber: req.body.questionNumber,
        questionText: req.body.questionText,
        answerImages: ansImage,
        writtenBy: req.body.writtenBy,
      });

      await q.save();

      await topper.findByIdAndUpdate(req.body.writtenBy, {
        $push: { Answers: q._id },
      });

      res.status(200).json({ message: "success" });
    } catch (err) {
      console.error("Error in handler:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(400).json({ message: "bad request" });
  }
};
export default connectDb(handler);
