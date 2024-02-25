"use client";
import React, { useEffect, useState } from "react";
import styles from "../../../(styles)/(pages-style)/topperId.module.css";
import Link from "next/link";
import { useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
const TopperCard = ({ params }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const action = searchParams.get("action");
  const topperId = params?.topperId;
  const [toppers, setToppers] = useState([]);
  const editor = useRef(null);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    year: "",
    optionalSub: "",
    gs1marks: "",
    gs2marks: "",
    gs3marks: "",
    gs4marks: "",
    Remarks: "",
    rank: "",
    essayMarks: "",
    prelimsScoreCsat: "",
    prelimsScoreGs: "",
    optional1Marks: "",
    optional2Marks: "",
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [slugName, rankandyear] = topperId.split("-rank-");
        const [rank, year] = rankandyear.split("-");
        const parsedRank = parseInt(rank, 10);
        const parsedYear = parseInt(year, 10);
        const dataParse = { parsedRank: parsedRank, parsedYear: parsedYear };
        const res = await axios.post(
          "/api/user/get-topper-by-rank-and-year",
          dataParse
        );

        if (isMounted) {
          setFormData({
            year: res.data.toppers.year,
            rank: res.data.toppers.rank,
            firstname: res.data.toppers.firstname,
            lastname: res.data.toppers.lastname,
            optionalSub: res.data.toppers.optionalSub,
            gs1marks: res.data.toppers.gs1marks,
            gs2marks: res.data.toppers.gs2marks,
            gs3marks: res.data.toppers.gs3marks,
            gs4marks: res.data.toppers.gs4marks,
            Remarks: res.data.toppers.Remarks,
            essayMarks: res.data.toppers.essayMarks,
            prelimsScoreCsat: res.data.toppers.prelimsScoreCsat,
            prelimsScoreGs: res.data.toppers.prelimsScoreGs,
            optional1Marks: res.data.toppers.optional1Marks,
            optional2Marks: res.data.toppers.optional2Marks,
          });
          setToppers(res.data.toppers);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [topperId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleTextEditor = (name, content) => {
    if (name === "Remarks") {
      setFormData((prevData) => ({
        ...prevData,
        Remarks: content,
      }));
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();

    const topperId = toppers._id;
    const updatedFields = {
      rank: formData.rank,
      year: formData.year,
      firstname: formData.firstname,
      lastname: formData.lastname,
      optionalSub: formData.optionalSub,
      gs1marks: formData.gs1marks,
      gs2marks: formData.gs2marks,
      gs3marks: formData.gs3marks,
      gs4marks: formData.gs4marks,
      Remarks: formData.Remarks,
      essayMarks: formData.essayMarks,
      prelimsScoreCsat: formData.prelimsScoreCsat,
      prelimsScoreGs: formData.prelimsScoreGs,
      optional1Marks: formData.optional1Marks,
      optional2Marks: formData.optional2Marks,
    };
    try {
      const response = await axios.post("/api/admin/updateTopper", {
        topperId,
        updatedFields,
      });
      toast.success("Updated the topper successfully.");
      router.push("/admin/toppers-page");

      // Handle success or update UI as needed
    } catch (error) {
      console.error("Error updating Topper:", error);
      // Handle error or update UI accordingly
    }
  };

  return (
    <div className={styles.TopperTopContainer}>
      <div className={styles.wrapper}>
        <div className={styles.TopperCardMainContainer}>
          <div className={styles.TopperDetails}>
            <div
              className={`${styles.TopperDetails1} ${styles.TopperDetailsMain}`}
            >
              <div className={styles.editBtnDiv}></div>
              <div className={styles.TopperProfileImgdiv}>
                <Image
                  className={styles.TopperProfileImg}
                  alt={toppers.firstname + " " + toppers.lastname}
                  fill
                  priority
                  objectFit="cover"
                  objectPosition="center"
                  src={toppers.imageUrl}
                ></Image>
              </div>
              <div className={styles.TopperDetailsDivs}>
                <label htmlFor="">Username</label>
                {action !== "update" ? (
                  <div className={styles.TopperName}>
                    {toppers.firstname} {toppers.lastname}
                  </div>
                ) : (
                  <>
                    {" "}
                    <div className={styles.inputDivName}>
                      <input
                        type="text"
                        name="firstname"
                        placeholder="Topper Name "
                        value={formData.firstname}
                        onChange={handleInputChange}
                      />
                    </div>
                    <label htmlFor="">lastname</label>
                    <div className={styles.inputDivName}>
                      <input
                        type="text"
                        name="lastname"
                        placeholder="Topper Name "
                        value={formData.lastname}
                        onChange={handleInputChange}
                      />
                    </div>
                  </>
                )}
              </div>

              <div className={styles.TopperDetailsDivs}>
                {action !== "update" ? (
                  <div className={styles.TopperSub}>{toppers.optionalSub}</div>
                ) : (
                  <>
                    <label htmlFor="">Optional Subject</label>
                    <div className={styles.inputDivName}>
                      <input
                        type="text"
                        name="optionalSub"
                        placeholder="optional Sub"
                        value={formData.optionalSub}
                        onChange={handleInputChange}
                      />
                    </div>
                    <label htmlFor="">Rank</label>
                    <div className={styles.inputDivName}>
                      <input
                        type="text"
                        name="rank"
                        placeholder="Rank "
                        value={formData.rank}
                        onChange={handleInputChange}
                      />
                    </div>
                    <label htmlFor="">Year</label>
                    <div className={styles.inputDivName}>
                      <input
                        type="text"
                        name="year"
                        placeholder="Year "
                        value={formData.year}
                        onChange={handleInputChange}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className={styles.Topper2Section}>
              <div className={styles.editBtnDiv}></div>
              <h1 className={styles.Topper2SectionHead}>
                General studies marks
              </h1>
              <div className={styles.TopperGsContainer}>
                <div className={styles.GsMarksDiv}>
                  <h2>Gs 1</h2>
                  {action !== "update" ? (
                    <div>{toppers.gs1marks}</div>
                  ) : (
                    <div className={styles.inputDiv}>
                      <input
                        type="number"
                        name="gs1marks"
                        value={formData.gs1marks}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}
                </div>
                <div className={styles.GsMarksDiv}>
                  <h2>Gs 2</h2>
                  {action !== "update" ? (
                    <div>{toppers.gs2marks}</div>
                  ) : (
                    <div className={styles.inputDiv}>
                      <input
                        type="number"
                        name="gs2marks"
                        value={formData.gs2marks}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}
                </div>
                <div className={styles.GsMarksDiv}>
                  <h2>Gs 3</h2>
                  {action !== "update" ? (
                    <div>{toppers.gs3marks}</div>
                  ) : (
                    <div className={styles.inputDiv}>
                      <input
                        type="number"
                        name="gs3marks"
                        value={formData.gs3marks}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}
                </div>
                <div className={styles.GsMarksDivLast}>
                  <h2>Gs 4</h2>
                  {action !== "update" ? (
                    <div>{toppers.gs4marks}</div>
                  ) : (
                    <div className={styles.inputDiv}>
                      <input
                        type="number"
                        name="gs4marks"
                        value={formData.gs4marks}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.Topper3Section}>
              <div className={styles.editBtnDiv1}></div>
              <div className={styles.TopperRemark}>
                <h2>Remarks</h2>
                {action !== "update" ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: toppers.Remarks }}
                  ></div>
                ) : (
                  <JoditEditor
                    ref={editor}
                    value={formData.Remarks}
                    tabIndex={1}
                    onBlur={(newContent) =>
                      handleTextEditor("Remarks", newContent)
                    }
                    onChange={(newContent) => {}}
                  />
                )}
              </div>
            </div>
          </div>
          <div className={styles.Topper4Section}>
            <div className={styles.editBtnDiv1}></div>
            <div className={styles.Topper4Head}>
              <h1>Profile Scores</h1>
            </div>
            <div className={styles.scoresDiv}>
              <div className={styles.Scores}>
                <h2>Essay Marks</h2>
                {action !== "update" ? (
                  <div>{toppers.essayMarks}</div>
                ) : (
                  <div className={styles.inputDiv}>
                    <input
                      type="number"
                      name="essayMarks"
                      value={formData.essayMarks}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
              </div>
              <div className={styles.preliemsGs}>
                <h2>Prelims score gs</h2>
                {action !== "update" ? (
                  <div>{toppers.prelimsScoreGs}</div>
                ) : (
                  <div className={styles.inputDiv}>
                    <input
                      type="number"
                      name="prelimsScoreGs"
                      value={formData.prelimsScoreGs}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
              </div>
              <div className={styles.Scores}>
                <h2>Prelims score csat</h2>
                {action !== "update" ? (
                  <div>{toppers.prelimsScoreCsat}</div>
                ) : (
                  <div className={styles.inputDiv}>
                    <input
                      type="number"
                      name="prelimsScoreCsat"
                      value={formData.prelimsScoreCsat}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
              </div>
              <div className={styles.Optional1}>
                <h2>Optional 1 marks</h2>
                {action !== "update" ? (
                  <div>{toppers.optional1Marks}</div>
                ) : (
                  <div className={styles.inputDiv}>
                    <input
                      type="number"
                      name="optional1Marks"
                      value={formData.optional1Marks}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
              </div>
              <div className={styles.Scores}>
                <h2>Optional 2 marks</h2>
                {action !== "update" ? (
                  <div>{toppers.optional2Marks}</div>
                ) : (
                  <div className={styles.inputDiv}>
                    <input
                      type="number"
                      name="optional2Marks"
                      value={formData.optional2Marks}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className={styles.TopperShowAnswersBtn}>
              <Link href={`/Topper/${topperId}/Answer/TopperAnswers`}>
                <div>Answers</div>
              </Link>
              <div
                onClick={(e) => {
                  handleUpdate(e);
                }}
              >
                Save
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopperCard;
