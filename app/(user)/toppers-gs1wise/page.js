export const dynamic = "auto";
import options from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import topper from "@/models/topper";
import mongoose from "mongoose";
import Link from "next/link";
import UserCard from "@/user/UserCard";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import IconProvider from "@/lib/context/IconContext";
import styles from "../../../user/css/search-topper.module.css";
import ServerSearchparams from "@/user/components/server-search-params";
async function getTopper({ query, page, limit }) {
  await mongoose.connect(process.env.MONGO_URI);

  const skip = (page - 1) * limit;
  const pipeline = [
    { $skip: skip },
    { $limit: limit },
    { $sort: { gs1marks: -1 } },
  ];
  if (query) {
    pipeline.unshift({
      $search: {
        index: "searchTopper",
        text: {
          query: query,
          path: [
            "fullname",
            "optionalSub",
            "firstname",
            "lastname",
            "rank",
            "year",
          ],
          fuzzy: {
            maxEdits: 1,
            prefixLength: 3,
            maxExpansions: 50,
          },
        },
      },
    });
  }

  try {
    let toppers;
    let totalCount;
    if (pipeline.length > 0) {
      const [results, count] = await Promise.all([
        topper.aggregate(pipeline),
        topper.countDocuments(),
      ]);
      toppers = results;
      totalCount = count;
    } else {
      toppers = await topper.find();
      totalCount = toppers.length;
    }
    return { toppers, totalCount };
  } catch (error) {
    console.error("Error during search:", error);
    return [];
  }
}
export const metadata = {
  title: "Toppers",
  description:
    "View UPSC 2023 Toppers marks along with their answer copies. Find topper copies of Ishita Kishore, Shruti Sharma and many more.",
  alternates: {
    canonical: `/all-toppers`,
  },
};
export default async function Home({ searchParams }) {
  const session = await getServerSession(options);
  const containerClassName =
    session?.user.role === "admin"
      ? styles.AdminMainContainer
      : styles.UserMainContainer;
  const params = searchParams.search ?? "";

  let mainToppers = [];

  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 20;
  const { toppers, totalCount } = await getTopper({
    query: params,
    page,
    limit,
  });
  const totalPages = Math.ceil(totalCount / limit);
  const pageNumbers = Array.from({ length: 5 }, (_, index) => page - 2 + index);
  mainToppers = toppers;
  return (
    <div className={containerClassName}>
      <div className={styles.Wrapper}>
        <div className={styles.PageHeadingContainer}>
          <div className={styles.PageHeading}>
            <h1>
              UPSC 2022 TOPPERS <span>GS-1 WISE</span>
            </h1>
          </div>
        </div>
        <div className={styles.FilterOptionsContainer}>
          <ServerSearchparams></ServerSearchparams>
        </div>
        <div className={styles.paginationDiv}>
          {/* <div className={styles.paginationButtons}>
            <Link href={`/all-toppers?page=${page > 1 ? page - 1 : 1}`}>
              <div className={styles.prevButton}>
                <MdKeyboardArrowLeft  />
              </div>
            </Link>
            <div>{page}</div>

            {page < totalPages && (
              <Link href={`/all-toppers?page=${page + 1}`}>
                <div className={styles.nextButton}>
                  {" "}
                  <MdKeyboardArrowRight />
                </div>
              </Link>
            )}
          </div> */}
          {/* <div className={styles.totalDataShown}>
            <div>{Math.min((page - 1) * limit + 1, totalCount)}</div>-{" "}
            <div>{Math.min((page - 1) * limit + limit, totalCount)}</div>
          </div> */}
        </div>

        {params !== "" && <p>Showing results for {searchParams.search}</p>}
        <div className={styles.TopperGalaryDiv}>
          {mainToppers.map((data, index) => {
            return (
              <UserCard
                data={data}
                key={data.firstname + data.lastname}
              ></UserCard>
            );
          })}
        </div>

        <div className={styles.paginationDiv}>
          {page > 1 && (
            <Link href={`/toppers-gs1wise?page=${page - 1}`}>
              <div className={styles.paginationEle}>Previous</div>
            </Link>
          )}

          {pageNumbers.map((pageNumber) => {
            const isPageValid =
              pageNumber > 0 &&
              pageNumber <= totalPages &&
              (totalPages - pageNumber < 2 || pageNumber - page < 2);

            return isPageValid ? (
              <Link
                key={pageNumber}
                href={`/toppers-gs1wise?page=${pageNumber}`}
              >
                <div
                  className={`${styles.paginationEle} ${
                    pageNumber === page ? styles.selectedPage : ""
                  }`}
                >
                  {pageNumber}
                </div>
              </Link>
            ) : null;
          })}
          {page < totalPages && (
            <Link href={`/toppers-gs1wise?page=${page + 1}`}>
              <div className={styles.paginationEle}>Next</div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
