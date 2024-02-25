"use client";
import React from "react";
import styles from "./css/toppersPage.module.css";
import Image from "next/image";
import { IoShareSocial } from "react-icons/io5";
import { LuDownload } from "react-icons/lu";
import { useState, useRef } from "react";
import * as htmlToImage from "html-to-image";
import ShareOnSocailMedia from "./components/ShareOnSocailMedia";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import { useSession } from "next-auth/react";

import ToppersAnswersLinksCard from "./components/toppersAnswersLinksCard";

const ToppersPage = ({ toppers }) => {
  const { data: session } = useSession();
  const profileViewRef = useRef(null);

  const [shareClicked, setshareClicked] = useState(false);
  const containerClassName =
    session?.user.role === "admin"
      ? styles.AdminMainContainer
      : styles.UserMainContainer;

  const [total, setTotal] = useState(
    toppers.essayMarks +
      toppers.gs1marks +
      toppers.gs2marks +
      toppers.gs3marks +
      toppers.gs4marks +
      toppers.optional1Marks +
      toppers.optional2Marks
  );

  const downloadProfileImage = async () => {
    if (profileViewRef.current) {
      try {
        const dataUrl = await htmlToImage.toJpeg(profileViewRef.current);

        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "profile-image.png";
        link.click();
      } catch (error) {
        console.error("Error capturing profile image:", error);
      }
    }
  };
  return (
    <div className={containerClassName}>
      <div className={styles.wrapper}>
        <div className={styles.PageHeadingContainer}>
          <div className={styles.PageHeading}>
            <h1>
              {toppers.firstname.charAt(0).toUpperCase() +
                toppers.firstname.slice(1)}{" "}
              {toppers.lastname.charAt(0).toUpperCase() +
                toppers.lastname.slice(1)}{" "}
              <span>Complete Strategy</span>
            </h1>
          </div>
        </div>

        <div className={styles.profileView} ref={profileViewRef}>
          <div className={styles.actionButtons}>
            <IoShareSocial
              size={25}
              onClick={(e) => {
                setshareClicked(!shareClicked);
              }}
            />
            {shareClicked && (
              <ShareOnSocailMedia
                link={`${process.env.NEXT_PUBLIC_DOMAIN}/toppers/${toppers.slug}`}
              ></ShareOnSocailMedia>
            )}
            <LuDownload size={25} onClick={downloadProfileImage} />
          </div>
          <div className={styles.profileView1}>
            <div className={styles.profileName}>
              <h1>
                {toppers.firstname.charAt(0).toUpperCase() +
                  toppers.firstname.slice(1)}{" "}
                {toppers.lastname.charAt(0).toUpperCase() +
                  toppers.lastname.slice(1)}{" "}
                <span>Marksheet</span>
              </h1>
            </div>
            <div className={styles.profileImage}>
              <div className={styles.profileImageDiv1}>
                <div className={styles.profileImageDiv2}>
                  <Image
                    src={toppers.imageUrl}
                    fill
                    objectFit="cover"
                    objectPosition="center"
                    className={styles.userProfile}
                  ></Image>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.profileView2}>
            <div className={styles.profileRank}>
              <h1>Rank {toppers.rank}</h1>
              <h3>MARKS OBTAINED</h3>
              <div className={styles.TopperMarks}>
                <div>
                  <p>Essay:</p>
                  <div>
                    <div className={styles.meterContainer}>
                      <div
                        class={styles.meterValue}
                        style={{
                          width: (toppers.essayMarks / 250) * 100 + "%",
                        }}
                      ></div>
                    </div>
                    <p>{toppers.essayMarks}</p>
                  </div>
                </div>
                <div>
                  <p>Gs1:</p>
                  <div>
                    <div class={styles.meterContainer}>
                      <div
                        class={styles.meterValue}
                        style={{ width: (toppers.gs1marks / 250) * 100 + "%" }}
                      ></div>
                    </div>
                    <p>{toppers.gs1marks}</p>
                  </div>
                </div>
                <div>
                  <p>Gs2:</p>
                  <div>
                    <div class={styles.meterContainer}>
                      <div
                        class={styles.meterValue}
                        style={{ width: (toppers.gs2marks / 250) * 100 + "%" }}
                      ></div>
                    </div>
                    <p>{toppers.gs2marks}</p>
                  </div>
                </div>
                <div>
                  <p>Gs3:</p>
                  <div>
                    <div class={styles.meterContainer}>
                      <div
                        class={styles.meterValue}
                        style={{ width: (toppers.gs3marks / 250) * 100 + "%" }}
                      ></div>
                    </div>
                    <p>{toppers.gs3marks}</p>
                  </div>
                </div>
                <div>
                  <p>Gs4:</p>
                  <div>
                    <div class={styles.meterContainer}>
                      <div
                        class={styles.meterValue}
                        style={{ width: (toppers.gs4marks / 250) * 100 + "%" }}
                      ></div>
                    </div>
                    <p>{toppers.gs4marks}</p>
                  </div>
                </div>
                <div>
                  <p>{toppers.optionalSub} 1:</p>
                  <div>
                    <div class={styles.meterContainer}>
                      <div
                        class={styles.meterValue}
                        style={{
                          width: (toppers.optional1Marks / 250) * 100 + "%",
                        }}
                      ></div>
                    </div>
                    <p>{toppers.optional1Marks}</p>
                  </div>
                </div>
                <div>
                  <p>{toppers.optionalSub} 2:</p>
                  <div>
                    <div class={styles.meterContainer}>
                      <div
                        class={styles.meterValue}
                        style={{
                          width: (toppers.optional2Marks / 250) * 100 + "%",
                        }}
                      ></div>
                    </div>
                    <p>{toppers.optional2Marks}</p>
                  </div>
                </div>
                <div>
                  <p>WRITTEN TOTAL:</p>
                  <div>
                    <div class={styles.meterContainer}>
                      <div
                        class={styles.meterValue}
                        style={{ width: (total / 1750) * 100 + "%" }}
                      ></div>
                    </div>
                    <p>{total}</p>
                  </div>
                </div>
                <div>
                  <p>PERSONALITY TEST :</p>
                  <div>
                    <div class={styles.meterContainer}>
                      <div
                        class={styles.meterValue}
                        style={{
                          width: (toppers.interviewMarks / 250) * 100 + "%",
                        }}
                      ></div>
                    </div>
                    <p>{toppers.interviewMarks}</p>
                  </div>
                </div>
                <div className={styles.finalMarks}>
                  <p>FINAL TOTAL :</p>
                  <div>
                    <div class={styles.meterContainer}>
                      <div
                        class={styles.meterValue}
                        style={{
                          width:
                            ((toppers.interviewMarks + total) / 2000) * 100 +
                            "%",
                        }}
                      ></div>
                    </div>
                    <p>{toppers.interviewMarks + total}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.RemarkSection}>
          <div className={styles.remarkDiv}>
            <p dangerouslySetInnerHTML={{ __html: toppers.Remarks }}></p>
          </div>
        </div>
        <div className={styles.toppersAnswersSection}>
          <h1>
            {toppers.firstname} {toppers.lastname} <span> Answer Copies</span>
          </h1>
          <div className={styles.toppersAnswersDiv}>
            <ToppersAnswersLinksCard
              session={session}
              toppers={toppers}
              linkname="essayLinks"
              marksName="essayMarks"
              heading="Essay Copies"
            ></ToppersAnswersLinksCard>
            <ToppersAnswersLinksCard
              session={session}
              toppers={toppers}
              linkname="gs1Links"
              marksName="gs1marks"
              heading="Gs-1 Copies"
            ></ToppersAnswersLinksCard>
            <ToppersAnswersLinksCard
              session={session}
              toppers={toppers}
              linkname="gs2Links"
              marksName="gs2marks"
              heading="Gs-2 Copies"
            ></ToppersAnswersLinksCard>
            <ToppersAnswersLinksCard
              session={session}
              toppers={toppers}
              linkname="gs3Links"
              marksName="gs3marks"
              heading="Gs-3 Copies"
            ></ToppersAnswersLinksCard>
            <ToppersAnswersLinksCard
              session={session}
              toppers={toppers}
              linkname="gs4Links"
              marksName="gs4marks"
              heading="Gs-4 Copies"
            ></ToppersAnswersLinksCard>
            <ToppersAnswersLinksCard
              session={session}
              toppers={toppers}
              linkname="optional1Links"
              marksName="optional1Marks"
              heading={`${toppers.optionalSub}-1 Copies`}
            ></ToppersAnswersLinksCard>
            <ToppersAnswersLinksCard
              session={session}
              toppers={toppers}
              linkname="optional2Links"
              marksName="optional2Marks"
              heading={`${toppers.optionalSub}-1 Copies`}
            ></ToppersAnswersLinksCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToppersPage;
