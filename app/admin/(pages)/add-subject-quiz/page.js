import React from "react";
import styles from "../../(styles)/(pages-style)/AdminPage.module.css";

function AddSubjectQuiz() {
  const SubjectList = [
    "Polity",
    "Economy",
    "Modern history",
    "Medieval history",
    "Ancient history",
    "Geography",
    "Science",
    "Environment",
    "Current affairs",
  ];
  return (
    <div className={styles.AdminQuizMainContainer}>
      <div>
        <div className={styles.quizQuestion}>xyz</div>
        <div className={styles.quizSubjectGroup}>
          {SubjectList.map((ele, index) => (
            <button key={index}>{ele}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddSubjectQuiz;
