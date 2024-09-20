"use client";
import React, { useEffect, useState } from "react";
import styles from "../../(styles)/(pages-style)/AdminPage.module.css";
import axios from "axios";
function AddSubjectQuiz() {
  const [question, setQusetion] = useState({});
  const [isLoading, setisLoading] = useState(true);
  const SubjectList = [
    "polity",
    "economy",
    "modern history",
    "medieval history",
    "ancient history",
    "geography",
    "science",
    "environment",
    "current affairs",
  ];
  async function fetchData() {
    const response = await axios.get("/api/quiz/getQuiz?admin=true");
    setQusetion(response.data.res);
    setisLoading(false);
    console.log("🚀 ~ fetchData ~ response.data.res:", response.data.res);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function onClickHandler(subject) {
    const response = await axios.post("/api/quiz/updateQuiz", {
      _id: question._id,
      subject: subject,
    });
    setisLoading(true);
    console.log("🚀 ~ onClickHandler ~ response:", response.data.res);
    fetchData();
  }

  return (
    <div className={styles.AdminQuizMainContainer}>
      {isLoading && <div>Loading</div>}
      {!isLoading && (
        <div>
          {question.text && (
            <div className={styles.quizQuestion}>
              <div
                dangerouslySetInnerHTML={{
                  __html: question.text?.replaceAll(/\n/g, ""),
                }}
              ></div>
              {question?.options?.map((ele, index) => {
                return (
                  <div key={index}>
                    <span>{ele}</span>
                  </div>
                );
              })}
              <div className="note">
                <p
                  dangerouslySetInnerHTML={{
                    __html: question?.solutionTextmain.replace(/\n/g, ""),
                  }}
                ></p>
              </div>
            </div>
          )}
          {!question.text && (
            <div className={styles.quizQuestion}>No Question Found</div>
          )}
          {question.text && (
            <div className={styles.quizSubjectGroup}>
              {SubjectList.map((ele, index) => (
                <button
                  key={index}
                  className={styles.btnOutlinePrimary}
                  onClick={() => onClickHandler(ele)}
                >
                  {ele.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AddSubjectQuiz;
