import React from "react";
import styles from "./UserPage.module.css";
import mongoose from "mongoose";
import question from "@/models/question";
import Link from "next/link";

const UserPage = ({ questions }) => {
  return (
    <div className={styles.all}>
      <div className={styles.questionsMainContainer}>
        <div className={styles.questionHeadDiv}>
          <h1 className={styles.questionHead}>Admin Dashboard</h1>
        </div>

        <div className={styles.horizontalLine}></div>
        <div className={styles.questionsContainter}>
          <Link href={`/question/pyqs-list-admin`}>
            <div>
              <div className={styles.adminPagesOption}>
                <h2>Pyqs </h2>
              </div>
            </div>
          </Link>
          <Link href={`/question/current-affairs-list-admin`}>
            <div>
              <div className={styles.adminPagesOption}>
                <h2>Current affairs </h2>
              </div>
            </div>
          </Link>
          {/* {questions &&
            questions.map((item, index) => {
              const isEven = index % 2 === 0;
              const questionContainerClass = isEven
                ? `${styles.questionContainer} ${styles.even}`
                : styles.questionContainer;
              return (
                <Link
                  key={item._id}
                  href={`/question/${item.slug}`}
                  className={styles.adminQuestions}
                >
                  <div className={questionContainerClass}>
                    <div className="question-title">
                      <h2>{item.Title}</h2>
                    </div>

                    <div className="question-description">
                      <p>{item.SubmitTime}</p>
                    </div>
                  </div>
                </Link>
              );
            })} */}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    if (mongoose.connections[0].readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI);
    }

    const questions = await question.find();

    return {
      props: { questions: JSON.parse(JSON.stringify(questions)) },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: { questions: [] },
    };
  }
}

export default UserPage;
