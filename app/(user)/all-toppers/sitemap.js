import topper from "@/models/topper";
import mongoose from "mongoose";
export const revalidate = 0;
export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN;
  //get all toppers
  await mongoose.connect(process.env.MONGO_URI);
  const toppers = await topper.find();
  const toppersUrls =
    toppers.map((toppers) => {
      return {
        url: `${baseUrl}/toppers/${toppers.slug}`,
        lastModified: new Date(),
      };
    }) ?? [];

  return [...toppersUrls];
}
