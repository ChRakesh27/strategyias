import question from "@/models/question";
import connectDb from "@/middleware/mongoose";
const middlewares = getRateLimitMiddlewares({ limit: 10 }).map(applyMiddleware);

const handler = async (req, res) => {
  try {
    await Promise.all(
      middlewares.map((middleware) => middleware(req, res))
    );
  } catch {
    return response.status(429).send("Too Many Requests");
  }
  let questions = await question.find();
  res.status(200).json({ questions });
};

export default connectDb(handler);
