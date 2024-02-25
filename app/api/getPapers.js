import topper from "@/models/topper";
import connectDb from "@/middleware/mongoose";

import paper from "@/models/paper";
const middlewares = getRateLimitMiddlewares({ limit: 10 }).map(applyMiddleware);

const handler = async (req, res) => {
  try {
    await Promise.all(
      middlewares.map((middleware) => middleware(req, res))
    );
  } catch {
    return response.status(429).send("Too Many Requests");
  }
  let papers = await paper.find();
  res.status(200).json({ papers });
};

export default connectDb(handler);
