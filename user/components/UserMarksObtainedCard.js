"use client";
import React, { useState } from "react";
import styles from "../css/UserCard.module.css";

const UserMarksObtainedCard = ({ toppers, name, nametoshow }) => {
  const [total, setTotal] = useState(
    toppers.essayMarks +
      toppers.gs1marks +
      toppers.gs2marks +
      toppers.gs3marks +
      toppers.gs4marks +
      toppers.optional1Marks +
      toppers.optional2Marks
  );

  return name === "writtenTotal" ? (
    // style={{ width: (total / 1750) * 100 + "%" }}
    <div className={styles.meterContainer}>
      <div className={styles.meterValueDiv}>
        <div
          className={styles.meterValue}
          style={{ width: (total / 1750) * 100 + "%" }}
        ></div>
        <div className={styles.marksName}>
          <p>Written:</p>
        </div>
      </div>

      <div className={styles.marks}>
        <p> {total}</p>
      </div>
    </div>
  ) : name === "finalTotal" ? (
    // width: ((toppers.interviewMarks + total) / 2000) * 100 + "%",
    <div className={styles.meterContainer}>
      <div className={styles.meterValueDiv}>
        <div
          className={styles.meterValue}
          style={{
            width: ((toppers.interviewMarks + total) / 2000) * 100 + "%",
          }}
        ></div>
        <div className={styles.marksName}>
          <p>Final:</p>
        </div>
      </div>

      <div className={styles.marks}>
        <p> {toppers.interviewMarks + total}</p>
      </div>
    </div>
  ) : (
    // style={{ width: (toppers[name] / 250) * 100 + "%" }}

    <div className={styles.meterContainer}>
      <div className={styles.meterValueDiv}>
        <div
          className={styles.meterValue}
          style={{ width: (toppers[name] / 250) * 100 + "%" }}
        ></div>
        <div className={styles.marksName}>
          <p>{nametoshow}:</p>
        </div>
      </div>

      <div className={styles.marks}>
        <p> {toppers[name]}</p>
      </div>
    </div>
  );
};

export default UserMarksObtainedCard;
