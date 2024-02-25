import connectDb from "@/middleware/mongoose";


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
  const { topicId } = req.query;

  try {
    const selectedTopic = await topic.findById(topicId).populate("subTopic");

    if (!selectedTopic) {
      return res.status(404).json({ message: "Paper not found" });
    }

    const subTopics = selectedTopic.subTopic;

    const response = subTopics.map((subTopic) => ({
      _id: subTopic._id,
      name: subTopic.name,
    }));

    res.status(200).json(response);
  } catch (error) {
    
    res.status(500).json({ message: "Internal server error" });
  }
};

export default connectDb(handler);
