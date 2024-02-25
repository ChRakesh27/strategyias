import question from "@/models/question";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
  const existingQuestion = await question.findOne({ slug: req.body.slug });

  if (existingQuestion) {
    return res
      .status(400)
      .json({ message: "A question with this slug already exists." });
  }
  if (req.method == "POST") {
    let q = new question({
      Title: req.body.Title,
      QuestionText: req.body.QuestionText,
      Answer: req.body.Answer,
      slug: req.body.slug,
      Image: req.body.Image,
      url: req.body.url,
      SubmitTime: req.body.SubmitTime,
      Subject: req.body.Subject,
      topic: req.body.topic,
    });

    await q.save();
    res.status(200).json({ message: "success" });
  } else {
    res.status(400).json({ message: "bad request" });
  }
};
export default connectDb(handler);
