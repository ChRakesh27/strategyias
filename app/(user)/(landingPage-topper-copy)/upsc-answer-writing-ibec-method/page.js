"use client";
import React, { useState } from "react";
import styles from "../../(styles)/topperCopy.module.css";
import Image from "next/image";
import Link from "next/link";
import Carousel from "./carousel";
function TopperCopyViewDetails() {
  const [faqActiveIndex, setFaqActiveIndex] = useState([]);

  const topperList = [
    {
      id: 1,
      img: "topper5.svg",
      name: "IAS SAURABH SHARMA",
      rank: "AIR 23",
      des: [
        "Scored 136 Marks in Essay (Top 1 percentile)",
        "Specialises in Art of Brainstorming",
        "Learn the power of connecting phrases from his answer copies",
      ],
    },

    {
      id: 2,
      img: "topper2.svg",
      name: "IAS ANIMESH PRADHAN",
      rank: "AIR 2",
      des: [
        "Scored 109 Marks in GS1 (Top 1 percentile)",
        "Specialises in Art of Presentations",
        "Learn using diagrams, micro-diagrams, examples from his answer copies",
      ],
    },
    {
      id: 3,
      img: "topper4.svg",
      name: "IAS KUNAL RASTOGI",
      rank: "AIR 15",
      des: [
        "Scored mammoth 134 Marks in GS2 (Top 1 percentile)",
        "Specialises in writing perfect answers for GS 2",
        "Learn the art of writing more in limited words",
        "Learn how to represent information in tabular format to fetch maximum marks",
      ],
    },
    {
      id: 4,
      img: "topper3.svg",
      name: "IAS Shaurya Arora",
      rank: "AIR 14",
      des: [
        "Scored 101 Marks in GS3 (Top 1 percentile)",
        "Learn how to score maximum marks in GS 3 - the lowest scoring paper",
        "See how Shaurya has used argument and example method in GS 3",
        "Learn how he tackled the trickiest questions !! ",
      ],
    },
    {
      id: 5,
      img: "topper1.svg",
      name: "IAS Aditya Shrivastava",
      rank: "AIR 1",
      des: [
        "Scored awesome 143 Marks in GS4 (Top 1 percentile)",
        "Learn the multi-dimensional approach of to each answer",
        "Replicate the stakeholder, ethical issues approach of writing case studies",
        "Make bar-graphs, diagrams in answers and get topper like marks!!",
      ],
    },
  ];

  const ibecMethodsList = [
    {
      title: "LEARN THE PERFECT INTRODUCTIONS",
      des: [
        "Start with clear, focused introductions for strong impact.",
        "Use quotes or data to set context quickly.",
        "Align introductions precisely with the question’s demand.",
      ],
    },
    {
      title: "LEARN TO THE POINT ANSWERING IN BODY",
      des: [
        "Write concise, direct answers without extra details.",
        "Use tables, diagrams, and bullet points for clarity.",
        "Include facts, examples, and visuals effectively.",
      ],
    },
    {
      title: "ADDED ENHANCEMENTS !!",
      des: [
        "Use quick diagrams and maps to boost answers. ",
        "Recycle points for multidimensional coverage.",
        "Integrate perspectives from multiple subjects easily.",
      ],
    },
    {
      title: "LEARN TO WRITE GREAT CONCLUSIONS",
      des: [
        "Summarize key points without repeating the content.",
        "End with solutions or forward-looking statements.",
        "Keep conclusions concise and impactful.",
      ],
    },
  ];

  const ambcbList = [
    {
      img: "planning.png",
      title: "Strategic Learning",
      des: "Focus on high-scoring techniques with our marks-wise compilation of handwritten answers.",
    },
    {
      img: "badge.png",
      title: "Expert Insights",
      des: "Learn from 4 IAS toppers who share their proven strategies for crafting compelling responses.",
    },
    {
      img: "insight.png",
      title: "Maximized Score Potential",
      des: "Discover how to write impactful answers organized by marks achieved for a competitive edge.",
    },
    {
      img: "content-writing.png",
      title: "Comprehensive Content",
      des: "Covers all GS papers (GS 1, GS 2, GS 3, GS 4, and Essay) with full coverage from 2017 to 2023 CSE Mains.",
    },
    {
      img: "diagram.png",
      title: "Exclusive Learning Tools",
      des: "Includes micro-diagrams and micro-angles to enhance your answers and improve your scores.",
    },
    {
      img: "telegram.png",
      title: "Join the Community",
      des: "Access a private Telegram group for interaction, sharing, and exclusive sessions with toppers.",
    },
  ];

  const gs1toppersList = [
    {
      img: "gs1-1.png",
      title: "The Diagram Maestro",
      des: [
        "Balanced diagrams with concise explanations.",
        "Used micro-diagrams to clarify complex ideas.",
        "Delivered maximum content in fewer words.",
      ],
    },
    {
      img: "gs1-2.png",
      title: "The Visual Strategist",
      des: [
        "Specialized in maps and charts for clarity.",
        "Thematic approach to make answers visually engaging.",
        "Wrote concise, well-structured answers.",
      ],
    },
    {
      img: "gs1-3.png",
      title: "The Diagram Maestro",
      des: [
        "Integrated case studies with detailed maps.",
        "Recycled points for multi-dimensional answers.",
        "Used diagrams to simplify tough concepts.",
      ],
    },
  ];

  const gs2toppersList = [
    {
      img: "gs2-1.png",
      title: "The Policy Prodigy",
      des: [
        "Excelled in concise, policy-based answers.",
        "Used data and tables to present key points clearly.",
        "Focused on connecting current affairs with static content",
      ],
    },
    {
      img: "gs2-2.png",
      title: "The Case Study Specialist",
      des: [
        "Balanced legal references with practical solutions.",
        "Focused on multi-dimensional analysis for each question.",
        "Used case studies to enrich answers with real-world examples.",
      ],
    },
    {
      img: "gs2-3.png",
      title: "The Tabular Maestro",
      des: [
        "Mastered writing crisp, to-the-point answers.",
        "Integrated governance and policy examples effectively.",
        "Highlighted constitutional principles in all relevant answers.",
      ],
    },
  ];

  const cypList = [
    {
      include: "Keywords",
      all: true,
      essay: true,
      gs1: true,
      gs2: true,
      gs3: true,
      gs4: true,
    },
    {
      include: "Facts",
      all: true,
      essay: true,
      gs1: true,
      gs2: true,
      gs3: true,
      gs4: true,
    },
    {
      include: "Data",
      all: true,
      essay: true,
      gs1: true,
      gs2: true,
      gs3: true,
      gs4: true,
    },
    {
      include: "Maps",
      all: true,
      essay: true,
      gs1: true,
      gs2: true,
      gs3: true,
      gs4: true,
    },
    {
      include: "Diagrams",
      all: true,
      essay: true,
      gs1: true,
      gs2: true,
      gs3: true,
      gs4: true,
    },
    {
      include: "Micro Diagrams",
      all: true,
      essay: true,
      gs1: true,
      gs2: true,
      gs3: true,
      gs4: true,
    },
    {
      include: "Crisp Introductions",
      all: true,
      essay: true,
      gs1: true,
      gs2: true,
      gs3: true,
      gs4: true,
    },
    {
      include: "Forward Looking Conclusions",
      all: true,
      essay: true,
      gs1: true,
      gs2: true,
      gs3: true,
      gs4: true,
    },
    {
      include: "Bouncer Questions",
      all: true,
      essay: true,
      gs1: true,
      gs2: true,
      gs3: true,
      gs4: true,
    },
    {
      include: "5 Sec Diagram Collections",
      all: true,
      essay: true,
      gs1: true,
      gs2: true,
      gs3: true,
      gs4: true,
    },
  ];

  const sltbList = [
    {
      title: 'Helped me learn the "Structure" of the answer',
      des: "The General studies is so vast. I was looking for previous year question and answer notes on the internet and I found this one. This is the best hand written notes that helped me how to create structure for our answers. ",
      postBy: "- Amit Pandey",
      rate: 5,
    },
    {
      title: "Very helpful for beginners",
      des: "I will be attempting the exam next year. After going through the books written by Dr Gaurav sir and Akriti mam, i have confidence that even i can write UPSC Mains answers.",
      postBy: "- Vishnu Gowda",
      rate: 5,
    },
    {
      title: "High quality content in One book",
      des: "With this one book, i covered nearly 50% of the GS Paper 2 syllabus, that too with high quality content. I dont have to make seperate notes now.",
      postBy: "- Nisha Jacobs",
      rate: 5,
    },
    {
      title: "Amazing Content",
      des: "This book is written very nicely. This gives a deep insight on how IAS toppers approach a question and how I should be writing answers.",
      postBy: "- Biswajeet das",
      rate: 5,
    },
  ];

  const faqList = [
    {
      ques: "How many topper copies are there?",
      answer: "51 topper copies",
    },
    {
      ques: "Are all the topper copies verfied?",
      answer: "Yes, all are original copies compiled from various sources.",
    },
    {
      ques: "How many pdf will I get?",
      answer: "5 PDF for essay, GS1, GS2, GS3, GS4",
    },
    {
      ques: "Will I get in hardcopy format?",
      answer:
        "No, but you can get the pdf printed. These are only provided in soft copy format.",
    },
  ];

  function onFaqHandular(index) {
    if (faqActiveIndex.includes(index)) {
      setFaqActiveIndex((val) => val.filter((ele) => ele != index));
    } else {
      setFaqActiveIndex((val) => [...val, index]);
    }
  }
  const ibecImgType = ["introImgs", "bodyImgs", "enhanImgs", "conImgs"];
  return (
    <>
      <div className={styles.landingPageIcon}>
        <Link href={"/"}>
          <h3>STRATEGY IAS</h3>
        </Link>
      </div>
      <div className={styles.container}>
        <div className={styles.containerBody}>
          <div className={styles.home}>
            <div className={styles.heading}>
              SCORE 120+ MARKS IN EACH GS VIA 50+ TOPPERS USING IBEC METHOD !! 
            </div>
            <div className={styles.des}>
              <div>
                <b>
                  Contains 50+ topper copies, MARKS WISE NOT Rank Wise for
                  maximum benefits !!
                </b>
              </div>
              <div className={styles.rate_price}>
                <div className={styles.rating}>
                  <div>
                    <Image
                      src="/rating.svg"
                      width={100}
                      height={100}
                      className={styles.rateImg}
                      alt="Picture of the author"
                    />
                  </div>
                  <div>
                    <b>190+ Reviews </b>
                  </div>
                </div>
                <div>
                  <Link href={"#price"} className={styles.checkPrice}>
                    Check Price
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.details}>
                <div style={{ textAlign: "end", marginRight: "10px" }}>
                  <Image
                    src="/right-arrow 1.svg"
                    width={10}
                    height={10}
                    className={styles.rightArrowImg}
                    alt="Picture of the author"
                  />
                </div>
                <div>
                  Get answer copies of toppers in each paper
                  <span style={{ fontWeight: "bold" }}>(Verified ONLY)</span>
                </div>
              </div>
              <div className={styles.details}>
                <div style={{ textAlign: "end", marginRight: "10px" }}>
                  <Image
                    src="/right-arrow 1.svg"
                    width={10}
                    height={10}
                    className={styles.rightArrowImg}
                    alt="Picture of the author"
                  />
                </div>
                <div>Handwritten Answers from 20+ toppers</div>
              </div>
              <div className={styles.details}>
                <div style={{ textAlign: "end", marginRight: "10px" }}>
                  <Image
                    src="/right-arrow 1.svg"
                    width={10}
                    height={10}
                    className={styles.rightArrowImg}
                    alt="Picture of the author"
                  />
                </div>
                <div>Includes Micro-diagrams, Data, Facts, Examples</div>
              </div>
              <div className={styles.details}>
                <div style={{ textAlign: "end", marginRight: "10px" }}>
                  <Image
                    src="/right-arrow 1.svg"
                    width={10}
                    height={10}
                    className={styles.rightArrowImg}
                    alt="Picture of the author"
                  />
                </div>
                <div>
                  All GS Papers - GS 1, GS2, GS3, GS4 and Essay Covered!!
                </div>
              </div>
              <div className={styles.details}>
                <div style={{ textAlign: "end", marginRight: "10px" }}>
                  <Image
                    src="/right-arrow 1.svg"
                    width={10}
                    height={10}
                    className={styles.rightArrowImg}
                    alt="Picture of the author"
                  />
                </div>
                <div>Learn the subject specific way of writing answers</div>
              </div>
            </div>
            <Link
              href={"/upsc-answer-writing-ibec-method/payment"}
              className={styles.buynow}
            >
              BUY NOW
            </Link>
          </div>
          <div className={styles.ibec}>
            <div className={styles.heading}>
              WHAT IS THE <span className={styles.textColorRed}>IBEC </span>
              METHOD?
            </div>
            <div>
              {ibecMethodsList.map((item, index) => (
                <div className={styles.ibecRow} key={index}>
                  <div className={styles.ibecCol}>
                    <div className={styles.ibecTitle}>{item.title}</div>
                    <div className={styles.ibeclineStyle}></div>
                    {item.des.map((ele, index) => (
                      <div className={styles.ibecdes} key={index}>
                        <div>✅</div>
                        <span>{ele}</span>
                      </div>
                    ))}
                  </div>
                  <div className={styles.ibecCol}>
                    <div className={styles.carousel}>
                      <Carousel ibecImgType={ibecImgType[index]} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href={"/upsc-answer-writing-ibec-method/payment"}
              className={styles.buynow}
            >
              BUY NOW
            </Link>
          </div>
          <div className={styles.iasToppers}>
            <div className={styles.heading}>WHO ARE THESE IAS TOPPERS?</div>
            <div className={styles.cardGroup}>
              {topperList.map((item) => {
                return (
                  <div key={item.id}>
                    <div className={styles.card}>
                      <div>
                        <Image
                          src={"/" + item.img}
                          width={100}
                          height={100}
                          className={styles.topperImg}
                          alt="Picture of the author"
                        />
                        <div className={styles.topperName}>
                          <div>{item.name}</div>
                          <div>{item.rank}</div>
                        </div>
                      </div>
                      <div className={styles.cardBody}>
                        {item.des.map((ele, index) => {
                          return (
                            <div key={index}>
                              <div style={{ display: "flex", margin: "10px" }}>
                                ✅<div>{ele}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.ambcb}>
            <div className={styles.heading}>
              A MUST BUY COMPILATION FOR BEGINNERS
            </div>
            <div>
              India’s first -
              <span className={styles.textColorRed}>
                Marks Wise compilation
              </span>
              NOT RANK WISE!! 
            </div>

            <div className={styles.ambcbBody}>
              {ambcbList.map((ele, index) => (
                <div className={styles.ambcbCard} key={index}>
                  <div>
                    <Image
                      src={"/" + ele.img}
                      width={100}
                      height={100}
                      alt={ele.img}
                    />
                  </div>
                  <div className={styles.title}>{ele.title}</div>
                  <div className={styles.des}>{ele.des}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.hbcutc}>
            <div className={styles.heading}>
              HOW BEGINNERS CAN USE THIS COMPILATION
            </div>
            <div>
              New to the Mains exam?
              <span className={styles.textColorRed}> No worries</span>—this
              compilation is your
              <span className={styles.textColorRed}>ultimate resource!</span>
            </div>
            <div className={styles.hbcutcBody}>
              <div className={styles.divBgImg}>
                <Image
                  src="/Group.png"
                  width={1273}
                  height={1417}
                  className={styles.bgImg}
                  alt="vector"
                />
              </div>
            </div>
          </div>
          <div className={styles.tagt}>
            <div className={styles.heading}>TOPPER AMONG GS 1 TOPPERS!!</div>
            <div>Includes Maps and Diagrams</div>
            <div className={styles.tagtDesGroup}>
              <div className={styles.tagtDes}>
                <div>✅</div>
                <div>
                  Use the visually enriching diagrams in your answers, increase
                  marks instantly.
                </div>
              </div>
              <div className={styles.tagtDes}>
                <div>✅</div>
                <div>
                  Use the 5 seconds maps/diagrams from toppers copies - directly
                  plug in your answers.
                </div>
              </div>
              <div className={styles.tagtDes}>
                <div>✅</div>
                <div>
                  Master the art of recycling points for multiple dimensional
                  coverage.
                </div>
              </div>
            </div>
            {gs1toppersList.map((item, index) => (
              <div className={styles.tagtCard} key={index}>
                <div className={styles.details}>
                  <div className={styles.title}>{item.title}</div>
                  {item.des.map((ele, index) => (
                    <div className={styles.des} key={index}>
                      <Image
                        src={"/mdi_tick_circle.png"}
                        width={30}
                        height={30}
                        alt={item.img}
                      />
                      <span>{ele}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.img}>
                  <Image
                    src={"/" + item.img}
                    width={400}
                    height={400}
                    alt={item.img}
                    className={styles.paperImg}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className={styles.tagt} style={{ background: "#fff" }}>
            <div className={styles.heading}>TOPPER AMONG GS 2 TOPPERS!!</div>
            <div>Includes Maps and Diagrams</div>
            <div className={styles.tagtDesGroup}>
              <div className={styles.tagtDes}>
                <div>✅</div>
                <div>
                  Use crisp policy-based content in your answers to maximize
                  impact.
                </div>
              </div>
              <div className={styles.tagtDes}>
                <div>✅</div>
                <div>
                  Incorporate real-world case studies from topper copies to
                  provide depth and relevance.
                </div>
              </div>
              <div className={styles.tagtDes}>
                <div>✅</div>
                <div>
                  Master concise tabular presentation for complex data,
                  simplifying answers & save time.
                </div>
              </div>
            </div>
            {gs2toppersList.map((item, index) => (
              <div className={styles.tagtCard} key={index}>
                <div className={styles.details}>
                  <div className={styles.title}>{item.title}</div>
                  {item.des.map((ele, index) => (
                    <div className={styles.des} key={index}>
                      <Image
                        src={"/mdi_tick_circle.png"}
                        width={30}
                        height={30}
                        alt={item.img}
                      />
                      <span>{ele}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.img}>
                  <Image
                    src={"/" + item.img}
                    width={500}
                    height={500}
                    alt={item.img}
                    className={styles.paperImg}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className={styles.cyp} id="price">
            <div className={styles.heading}>Choose Your Package</div>
            <div className={styles.cpyTableDiv}>
              <table className={styles.cpyTable}>
                <thead>
                  <tr>
                    <th className={styles.stickyColumn}>INCLUDES </th>
                    <th style={{ textAlign: "center" }}>
                      <div>All</div>
                      <div>Rs 999/-</div>
                      <small>
                        <del className="del"> 4999/-</del>
                      </small>
                      <div>
                        <Link
                          href={"/upsc-answer-writing-ibec-method/payment"}
                          className={styles.tableBuyNow}
                        >
                          BUY NOW
                        </Link>
                      </div>
                    </th>
                    <th style={{ textAlign: "center" }}>
                      <div>ESSAY </div>
                      <div>Rs 499/-</div>
                      <small>
                        <del className="del"> 999/-</del>
                      </small>
                      <div>
                        <Link
                          href={"/upsc-answer-writing-ibec-method/payment"}
                          className={styles.tableBuyNow}
                        >
                          BUY NOW
                        </Link>
                      </div>
                    </th>
                    <th style={{ textAlign: "center" }}>
                      <div>GS 1</div>
                      <div>Rs 499/-</div>
                      <small>
                        <del className="del"> 999/-</del>
                      </small>
                      <div>
                        <Link
                          href={"/upsc-answer-writing-ibec-method/payment"}
                          className={styles.tableBuyNow}
                        >
                          BUY NOW
                        </Link>
                      </div>
                    </th>
                    <th style={{ textAlign: "center" }}>
                      <div>GS 2 </div>
                      <div>Rs 499/-</div>
                      <small>
                        <del className="del"> 999/-</del>
                      </small>
                      <div>
                        <Link
                          href={"/upsc-answer-writing-ibec-method/payment"}
                          className={styles.tableBuyNow}
                        >
                          BUY NOW
                        </Link>
                      </div>
                    </th>
                    <th style={{ textAlign: "center" }}>
                      <div>GS 3 </div>
                      <div>Rs 499/-</div>
                      <small>
                        <del className="del"> 999/-</del>
                      </small>
                      <div>
                        <Link
                          href={"/upsc-answer-writing-ibec-method/payment"}
                          className={styles.tableBuyNow}
                        >
                          BUY NOW
                        </Link>
                      </div>
                    </th>
                    <th style={{ textAlign: "center" }}>
                      <div>GS 4 </div>
                      <div>Rs 499/-</div>
                      <small>
                        <del className="del"> 999/-</del>
                      </small>
                      <div>
                        <Link
                          href={"/upsc-answer-writing-ibec-method/payment"}
                          className={styles.tableBuyNow}
                        >
                          BUY NOW
                        </Link>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cypList.map((ele, index) => (
                    <tr key={index}>
                      <td className={styles.stickyColumn}>{ele.include}</td>
                      {ele.all && (
                        <td style={{ textAlign: "center" }}>
                          <Image
                            src={"/charm_tick.webp.png"}
                            width={50}
                            height={50}
                            alt="charm_tick.webp"
                            className={styles.charmTick}
                          />
                        </td>
                      )}
                      {ele.essay && (
                        <td style={{ textAlign: "center" }}>
                          <Image
                            src={"/charm_tick.webp.png"}
                            width={50}
                            height={50}
                            alt="charm_tick.webp"
                            className={styles.charmTick}
                          />
                        </td>
                      )}
                      {ele.gs1 && (
                        <td style={{ textAlign: "center" }}>
                          <Image
                            src={"/charm_tick.webp.png"}
                            width={50}
                            height={50}
                            alt="charm_tick.webp"
                            className={styles.charmTick}
                          />
                        </td>
                      )}
                      {ele.gs2 && (
                        <td style={{ textAlign: "center" }}>
                          <Image
                            src={"/charm_tick.webp.png"}
                            width={50}
                            height={50}
                            alt="charm_tick.webp"
                            className={styles.charmTick}
                          />
                        </td>
                      )}
                      {ele.gs3 && (
                        <td style={{ textAlign: "center" }}>
                          <Image
                            src={"/charm_tick.webp.png"}
                            width={50}
                            height={50}
                            alt="charm_tick.webp"
                            className={styles.charmTick}
                          />
                        </td>
                      )}
                      {ele.gs4 && (
                        <td style={{ textAlign: "center" }}>
                          <Image
                            src={"/charm_tick.webp.png"}
                            width={50}
                            height={50}
                            alt="charm_tick.webp"
                            className={styles.charmTick}
                          />
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <div className={styles.heading}>STEAL DEAL ONLY FOR TODAY</div>
              <div style={{ margin: "20px", fontWeight: "700" }}>
                Offer Ends Today{" "}
              </div>
              <div>
                <span className={`${styles.heading} ${styles.offerPrice}`}>
                  @ ₹ 999/-{" "}
                </span>
                <del> ₹ 4999</del>
              </div>
              <div style={{ margin: "60px" }}>
                <Link
                  href={"/upsc-answer-writing-ibec-method/payment"}
                  className={styles.buynow}
                >
                  BUY NOW
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.sltb}>
            <div className={styles.heading}>STUDENTS LOVE THE BOOKS</div>
            <div>What students think about the book</div>
            <div className={styles.sltbCardGroup}>
              {sltbList.map((ele, index) => (
                <div className={styles.sltbCard} key={index}>
                  <div className={styles.title}>{ele.title}</div>
                  <div>{ele.des}</div>
                  <div className={styles.sltbCardFooter}>
                    <div>
                      <b>{ele.postBy}</b>
                    </div>
                    <div className={styles.rate}>
                      <Image
                        src="/rating.svg"
                        width={200}
                        height={50}
                        className={styles.rateImg}
                        alt="Picture of the author"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.faq}>
            <div className={styles.title}>Frequently asked Questions</div>
            <div>
              {faqList.map((ele, index) => (
                <div className={styles.faqItem} key={index}>
                  <button
                    onClick={() => onFaqHandular(index)}
                    className={styles.faqQuestion}
                  >
                    {ele.ques}{" "}
                    {faqActiveIndex.includes(index) ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-chevron-up"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-chevron-down"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                        />
                      </svg>
                    )}
                  </button>
                  {faqActiveIndex.includes(index) && (
                    <div className={styles.faqAnswer}>
                      <p>{ele.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopperCopyViewDetails;
