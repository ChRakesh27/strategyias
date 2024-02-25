import topper from "@/models/topper";
import React from "react";
import ToppersPage from "@/user/toppersPage";
import mongoose from "mongoose";
import UserActivityFunc from "@/app/(components)/UserActivityFunc";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";
import TopperPageFooter from "@/user/topperPageFooter";
import { getAllToppers } from "@/lib/topper/getAllToppers";
export async function generateMetadata({ params }) {
  const session = await getServerSession(options);
  const { topperId } = params;
  const [slugName, rankandyear] = topperId.split("-rank-");
  const [rank, year] = rankandyear.split("-");
  const parsedRank = parseInt(rank, 10);
  const parsedYear = parseInt(year, 10);
  const [firstname, lastname] = slugName.split("-");

  await mongoose.connect(process.env.MONGO_URI);
  const toppers = await topper.findOne({
    rank: parsedRank,
    year: parsedYear,
  });

  return {
    title:
      firstname.charAt(0).toUpperCase() +
      firstname.slice(1) +
      " " +
      lastname.charAt(0).toUpperCase() +
      lastname.slice(1) +
      " Answer copies",
    description:
      toppers?.metaDescription ||
      firstname.charAt(0).toUpperCase() +
        firstname.slice(1) +
        " " +
        lastname.charAt(0).toUpperCase() +
        lastname.slice(1) +
        " Answer copies",
    alternates: {
      canonical: `/toppers/${toppers?.slug}`,
    },
  };
}

export default async function TopperCard({ params }) {
  const { topperId } = params;

  const [slugName, rankandyear] = topperId.split("-rank-");

  const [rank, year] = rankandyear.split("-");

  const parsedRank = parseInt(rank, 10);
  const parsedYear = parseInt(year, 10);
  await mongoose.connect(process.env.MONGO_URI);
  const toppers = await topper.findOne({
    rank: parsedRank,
    year: parsedYear,
  });

  const allToppers = await getAllToppers("firstname,lastname,rank,year", "20");
  return (
    <div>
      <ToppersPage toppers={JSON.parse(JSON.stringify(toppers))}></ToppersPage>
      <TopperPageFooter toppersList={allToppers}></TopperPageFooter>
    </div>
  );
}
