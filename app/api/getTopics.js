import connectDb from "@/middleware/mongoose";
import Paper from "@/models/paper";
import Topic from "@/models/topic";
import Subtopic from "@/models/subtopic";
const middlewares = getRateLimitMiddlewares({ limit: 10 }).map(applyMiddleware);

const handler = async (req, res) => {
  try {
    await Promise.all(
      middlewares.map((middleware) => middleware(req, res))
    );
  } catch {
    return response.status(429).send("Too Many Requests");
  }
  const { paperId } = req.query;

  try {
    const selectedPaper = await Paper.findById(paperId).populate("paperTopics");

    if (!selectedPaper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    const topics = selectedPaper.paperTopics;

    const response = topics.map((topic) => ({
      _id: topic._id,
      name: topic.name,
    }));

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching topics:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default connectDb(handler);
