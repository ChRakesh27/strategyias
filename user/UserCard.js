import React from "react";
import Image from "next/image";
import styles from "./css/UserCard.module.css";

import Link from "next/link";
import UserMarksObtainedCard from "./components/UserMarksObtainedCard";
import UserActivityFunc from "@/app/(components)/UserActivityFunc";

import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";
import UserActivityButton from "./components/UserActivityButton";
const UserCard = async ({ data }) => {
  const session = await getServerSession(options);

  return (
    <div className={styles.TopperCard}>
      <div className={styles.TopperFirstDiv}>
        <div className={styles.TopperDetailsDiv}>
          <div className={styles.TopperIconDiv}>
            <Image
              src={data.imageUrl}
              alt={data.firstname + " " + data.lastname + " " + "profile image"}
              fill
              sizes="100%"
              style={{ objectFit: "cover", objectPosition: "center" }}
              className={styles.userProfile}
            ></Image>
            <div className={styles.TopperName}>
              <h1>
                {data.firstname} {data.lastname}
              </h1>
              <p>Rank {data.rank}</p>
            </div>
          </div>
        </div>
        <div className={styles.TopperMarksDiv}>
          <h3>MARKS OBTAINED</h3>
          <div className={styles.TopperMarks}>
            <UserMarksObtainedCard
              toppers={JSON.parse(JSON.stringify(data))}
              name={"essayMarks"}
              nametoshow={"Essay Marks"}
            ></UserMarksObtainedCard>
            <UserMarksObtainedCard
              toppers={JSON.parse(JSON.stringify(data))}
              name={"gs1marks"}
              nametoshow={"GS 1"}
            ></UserMarksObtainedCard>
            <UserMarksObtainedCard
              toppers={JSON.parse(JSON.stringify(data))}
              name={"gs2marks"}
              nametoshow={"GS 2"}
            ></UserMarksObtainedCard>
            <UserMarksObtainedCard
              toppers={JSON.parse(JSON.stringify(data))}
              name={"gs3marks"}
              nametoshow={"GS 3"}
            ></UserMarksObtainedCard>
            <UserMarksObtainedCard
              toppers={JSON.parse(JSON.stringify(data))}
              name={"gs4marks"}
              nametoshow={"GS 4"}
            ></UserMarksObtainedCard>
            <UserMarksObtainedCard
              toppers={JSON.parse(JSON.stringify(data))}
              name={"optional1Marks"}
              nametoshow={data.optionalSub + " " + "1"}
            ></UserMarksObtainedCard>
            <UserMarksObtainedCard
              toppers={JSON.parse(JSON.stringify(data))}
              name={"optional2Marks"}
              nametoshow={data.optionalSub + " " + "2"}
            ></UserMarksObtainedCard>
            <UserMarksObtainedCard
              toppers={JSON.parse(JSON.stringify(data))}
              name={"writtenTotal"}
            ></UserMarksObtainedCard>
            <UserMarksObtainedCard
              toppers={JSON.parse(JSON.stringify(data))}
              name={"interviewMarks"}
              nametoshow={"Interview"}
            ></UserMarksObtainedCard>
            <UserMarksObtainedCard
              toppers={JSON.parse(JSON.stringify(data))}
              name={"finalTotal"}
            ></UserMarksObtainedCard>
          </div>
        </div>
      </div>

      <Link className={styles.linkStyle} href={`/toppers/${data.slug}`}>
        <UserActivityButton
          nameOfbutton={"View Answer Sheet"}
          session={session}
          classname={"ShowAnswersBtn"}
          slug={JSON.parse(JSON.stringify(data.slug))}
        ></UserActivityButton>
        {/* <button type="submit" className={styles.ShowAnswersBtn}>
            View Answer Sheet
          </button> */}
      </Link>
    </div>
  );
};

export default UserCard;
