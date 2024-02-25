import topper from "@/models/topper";
import connectDb from "@/middleware/mongoose";
import answer from "@/models/answer";
const middlewares = getRateLimitMiddlewares({ limit: 10 }).map(applyMiddleware);

const handler = async (req, res) => {
  try {
    await Promise.all(
      middlewares.map((middleware) => middleware(req, res))
    );
  } catch {
    return response.status(429).send("Too Many Requests");
  }
  let answers = await answer.find();
  res.status(200).json({ answers });
};

export default connectDb(handler);
