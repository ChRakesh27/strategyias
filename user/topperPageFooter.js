"use client";
import React from "react";
import styles from "./css/topperPageFooter.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";
import UserActivityFunc from "@/app/(components)/UserActivityFunc";
const TopperPageFooter = ({ toppersList }) => {
  const { data: session, status } = useSession();
  const handleUserActivity = async (data) => {
    const slug =
      data.firstname +
      "-" +
      data.lastname +
      "-rank-" +
      data.rank +
      "-" +
      data.year;
    if (session && slug) {
      await UserActivityFunc(
        `Visited ${slug} page`,
        session?.user?.name,
        session?.user?.email
      );
    }
    return;
  };
  return (
    <div className={styles.footerWrapper}>
      <div className={styles.footerMainContainer}>
        <div className={styles.footerHeading}>
          <h2>Other Toppers <span>Complete Strategy</span> and <span>Answer Copies</span></h2>
        </div>
        <div className={styles.strategyListContainer}>
          <h3>Complete Strategy</h3>
          <div className={styles.AnswerCopiesList}>
            <h4>Answer Copies:</h4>
            <div className={styles.toppersList}>
              {toppersList.map((data, index) => {
                const link = `${data.firstname}-${data.lastname}-rank-${data.rank}-${data.year}`;
                return (
                  <Link
                    key={index}
                    onClick={(e) => handleUserActivity(data)}
                    href={`${process.env.NEXT_PUBLIC_DOMAIN}/toppers/${link}`}
                  >
                    <div className={styles.toppers}>
                      <h4>
                        Rank {data.rank} {data.firstname} {data.lastname} |{" "}
                      </h4>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopperPageFooter;
