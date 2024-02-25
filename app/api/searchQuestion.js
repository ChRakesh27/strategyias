import connectDb from "@/middleware/mongoose";
import Answer from "@/models/answer";
import paper from "@/models/paper";
import subtopic from "@/models/subtopic";
import topic from "@/models/topic";
const middlewares = getRateLimitMiddlewares({ limit: 10 }).map(applyMiddleware);

const handler = async (req, res) => {
  try {
    await Promise.all(
      middlewares.map((middleware) => middleware(req, res))
    );
  } catch {
    return response.status(429).send("Too Many Requests");
  }
  const { type, value } = req.query;

  try {
    let results;

    if (!type || !value) {
      return res.status(400).json({ message: "Invalid query parameters" });
    }

    switch (type) {
      case "testCode":
        results = await Answer.find({ testCode: new RegExp(`^${value}`, "i") })
          .sort({ questionNumber: 1 })
          .limit(1);
        break;

      case "questionNumber":
        results = await Answer.find({
          questionNumber: parseInt(value, 10),
        }).limit(10);
        break;
      case "paper":
        results = await paper
          .find({
            name: new RegExp(`^${value}`, "i"),
          })
          .limit(5);
     
        break;

      default:
        return res.status(400).json({ message: "Invalid search field" });
    }

    res.status(200).json(results);
  } catch (error) {
    console.error("Error in search API:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default connectDb(handler);
