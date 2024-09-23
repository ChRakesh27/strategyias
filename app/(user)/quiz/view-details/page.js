import React from "react";
import styles from "../../(styles)/landingPage.module.css";
// import { getServerSession } from "next-auth";
// import options from "@/app/api/auth/[...nextauth]/options";
import Image from "next/image";
import Link from "next/link";

async function LandingPage() {
  const cots = [
    {
      id: 1,
      image: "/question-mark.svg",
      title: "Extensive Question Bank",
      description:
        "Access 60,000+ questions covering every topic in the UPSC syllabus",
    },
    {
      id: 2,
      image: "/memory.svg",
      title: "Active Recall",
      description:
        "Improve retention by revising all incorrect answers with our recall system",
    },
    {
      id: 3,
      image: "/data.svg",
      title: "Advanced Dashboard",
      description:
        "Easily track your progress and improvement with our intuitive dashboard",
    },
    {
      id: 4,
      image: "/insurance.svg",
      title: "Holistic Coverage of PYQs",
      description:
        "Practice with Previous Years' Questions to familiarize yourself with the exam pattern",
    },
    {
      id: 5,
      image: "/insight.svg",
      title: "Performance Insights",
      description:
        "Get clear insights into your performance to spot strengths and weaknesses.",
    },
    {
      id: 6,
      image: "/exam-time.svg",
      title: "Notes Integration",
      description:
        "Add and review notes directly on questions for better recall and easy revision",
    },
  ];

  const wotsso = [
    {
      id: 1,
      image: "/SCENE1.svg",
      title: "LEARN TO TACKLE EVERY QUESTION",
      description: {
        text: "Each question is curated for upcoming Prelims to match the latest trends and patterns.",
        list: [
          "Learn to Reflect Exam Patterns",
          "Learn to Target Relevant Topics",
          "Learn to Stay Up-to-Date",
        ],
      },
    },
    {
      id: 2,
      image: "/SCENE2.svg",
      title: "LEARN TO COVER EVERY TOPIC",
      description: {
        text: "Comprehensive preparation with questions covering all areas of the UPSC syllabus",
        list: [
          "Learn to Cover Every Subject",
          "Learn to Avoid Knowledge Gaps",
          "Learn to Focus on Key Areas",
        ],
      },
    },
    {
      id: 3,
      image: "/SCENE3.svg",
      title: "LEARN TO MASTER PYQs",
      description: {
        text: "Holistic coverage of Previous Years' Questions (PYQs) to sharpen your approach",
        list: [
          "Learn to Understand Trends",
          "Learn to Identify Patterns",
          "Learn to Boost Confidence",
        ],
      },
    },
    {
      id: 4,
      image: "/SCENE4.svg",
      title: "LEARN TO TRACT PERFORMANCE",
      description: {
        text: "Use detailed analytics to monitor your progress and optimize your study strategy",
        list: [
          "Learn to Track Strengths",
          "Learn to Pinpoint Weaknesses",
          "Learn to Optimize Study Plans",
        ],
      },
    },
    {
      id: 5,
      image: "/SCENE5.svg",
      title: "LEARN TO USE ACTIVE RECALL",
      description: {
        text: "Revise all wrong questions with active recall techniques to strengthen memory.",
        list: [
          "Learn to Reinforce Mistakes",
          "Learn to Avoid Repeating Errors",
          "Learn to Enhance Retention",
        ],
      },
    },
    {
      id: 6,
      image: "/SCENE6.svg",
      title: "LEARN TO MONITOR PROGRESS",
      description: {
        text: "Access an advanced dashboard to track your performance and refine your study plan",
        list: [
          "Learn to Track Progress",
          "Learn to Use Detailed Insights",
          "Learn to Customize Your Plan",
        ],
      },
    },
  ];

  // const session = await getServerSession(options);
  // const containerClassName =
  //   session?.user.role === "admin"
  //     ? styles.adminLandingPage
  //     : styles.userLandingPage;
  // const containerBodyClassName =
  //   session?.user.role === "admin"
  //     ? styles.adminLandingPageBody
  //     : styles.userLandingPageBody;

  return (
    <>
      <div className={styles.landingPageIcon}>
        <Link href={"/"}>
          <h3>STRATEGY IAS</h3>
        </Link>
      </div>
      <div className={styles.userLandingPage}>
        <div className={styles.userLandingPageBody}>
          <div className={styles.home}>
            <div className={styles.heading}>UPSC PRELIMS TEST SERIES 2025</div>
            <div>
              Ace Your Prelims with{" "}
              <span className={styles.textRed}> 60,000+ </span> Curated
              Questions!
            </div>
            <div className={styles.disFJusC}>
              <div className={styles.subTitleGroup}>
                <div className={styles.subTitle}>
                  <div>
                    <Image
                      src="/CirclePoints.svg"
                      width={35}
                      height={35}
                      className={styles.CirclePoints}
                      alt="Picture of the author"
                    />
                  </div>
                  <span>Holistic Coverage of PYQs</span>
                </div>
                <div className={styles.subTitle}>
                  <Image
                    src="/CirclePoints.svg"
                    width={35}
                    height={35}
                    className={styles.CirclePoints}
                    alt="Picture of the author"
                  />
                  <span>Detailed Analytical Assessment System</span>
                </div>
                <div className={styles.subTitle}>
                  <Image
                    src="/CirclePoints.svg"
                    width={35}
                    height={35}
                    className={styles.CirclePoints}
                    alt="Picture of the author"
                  />
                  <span>Notes Integration directly on Questions</span>
                </div>
                <div className={styles.subTitle}>
                  <Image
                    src="/CirclePoints.svg"
                    width={35}
                    height={35}
                    className={styles.CirclePoints}
                    alt="Picture of the author"
                  />
                  <span>Advanced Dashboard for Monitoring Progress</span>
                </div>
              </div>
            </div>
            <div>
              <span className={styles.subTitle2}>
                Active Recall for All Wrong Questions
              </span>
            </div>
            <button className={styles.btnEnroll}>ENROLL NOW</button>
          </div>
          <div className={styles.cots}>
            <div className={styles.heading}>COMPONENTS OF OUR TEST SERIES</div>
            <div className={styles.cartGroup}>
              {cots.map((ele, index) => {
                return (
                  <div className={styles.cart} key={index}>
                    <div className={styles.cardBody}>
                      <div>
                        <Image
                          src={ele.image}
                          width={100}
                          height={100}
                          className={styles.cotsImage}
                          alt="Picture of the author"
                        />
                      </div>
                      <div className={styles.cartTitle}>{ele.title}</div>
                      <small className={styles.cartDes}>
                        {ele.description}
                      </small>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.wotsso}>
            <div className={styles.heading}>WHY OUR TEST SERIES STAND OUT</div>
            <div className="">
              {wotsso.map((ele) => {
                return (
                  <div key={ele.id} className={styles.wotssoBody}>
                    <div className={styles.wotssoBodyLeft}>
                      <div className={styles.wblTitle}>{ele.title}</div>
                      <div className={styles.wotssolineStyle}></div>
                      <div className={styles.wbldes}>
                        {ele.description?.text}
                      </div>
                      {ele.description?.list.map((item, index) => (
                        <div key={index} className={styles.wotssoGroup}>
                          <div className={styles.wgImage}>
                            <Image
                              src="/mdi_tick.svg"
                              width={30}
                              height={30}
                              className={styles.mdi_tick}
                              alt="Picture of the author"
                            />
                          </div>
                          <span className={styles.wbldes}>{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className={styles.wotssoBodyRight}>
                      <Image
                        src={ele.image}
                        width={600}
                        height={400}
                        className={styles.wotssoBodyImage}
                        alt="Picture of the author"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
