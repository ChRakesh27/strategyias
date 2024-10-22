"use client";
import React from "react";
import Link from "next/link";
import { useEffect } from "react";
import styles from "../css/toppersPage.module.css";
import LoginPop from "./LoginPop";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import UserActivityButton from "./UserActivityButton";
import { signIn } from "next-auth/react";
const ToppersAnswersLinksCard = ({
  session,
  toppers,
  linkname,
  heading,
  marksName,
}) => {
  const router = useRouter();
  const [linkClicked, setlinkClicked] = useState(false);
  useEffect(() => {
    setlinkClicked(false);
  }, []);
  const handleLoginPop = (e, link) => {
    e.preventDefault();

    toast.error("Please login to proceed");
    router.push("/api/auth/signin");
  };
  return (
    <>
      {linkClicked && <LoginPop handleLoginPop={handleLoginPop}></LoginPop>}
      <div className={styles.toppersAnswersHeading}>
        <h3>
          {toppers.firstname} {toppers.lastname} {heading}-{" "}
          <span>{toppers[marksName]}</span> Marks
        </h3>
      </div>
      <div>
        {session && toppers[linkname].length !== 0 ? (
          <>
            {toppers[linkname].map((data, index) => (
              <Link target="_blank" key={index} href={data} passHref>
                <UserActivityButton
                  slug={`clicked on ${heading} ${index + 1} copy of ${
                    toppers.firstname
                  } ${toppers.lastname} `}
                  classname={"toppersAnswers"}
                  nameOfbutton={`${heading} ${index + 1}`}
                ></UserActivityButton>
              </Link>
            ))}
          </>
        ) : !session && toppers[linkname].length !== 0 ? (
          <>
            {toppers[linkname].map((data, index) => (
              <div
                // onClick={(e) => handleLoginPop(e, data)}
                onClick={(e) => signIn("google", data)}
                key={index}
                className={styles.toppersAnswers}
              >
                Login to view!
              </div>
            ))}
          </>
        ) : session && toppers[linkname].length === 0 ? (
          <>
            {/* <div className={styles.toppersAnswers}>Coming Soon!</div> */}
            <div className={styles.toppersAnswers}>
              <Link href={"/upsc-answer-writing-ibec-method"}>
                View Details
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className={styles.toppersAnswers}>Login to view!</div>
          </>
        )}
      </div>
    </>
  );
};

export default ToppersAnswersLinksCard;
