import article from "@/models/article";
import topper from "@/models/topper";
import mongoose from "mongoose";
export const revalidate = 0;
export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN;
  //get all toppers
  await mongoose.connect(process.env.MONGO_URI);
  const note = await article.find();
  const notesUrl =
    note.map((note) => {
      return {
        url: `${baseUrl}/article/${note.slug}`,
        lastModified: new Date(),
      };
    }) ?? [];

  return [...notesUrl];
}
