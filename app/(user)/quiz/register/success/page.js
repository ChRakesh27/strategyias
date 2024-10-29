"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import styles from "../../../(styles)/quizRegister.module.css";

function Success({ searchParams }) {
  const { id } = searchParams;
  const [dataSet, setDataSet] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetch() {
      try {
        setIsLoading(true);
        const res = await axios.get("/api/quiz/getUserById?id=" + atob(id));
        setDataSet(res.data);
      } catch (error) {
        console.log("🚀 ~ error:", error);
      }
      setIsLoading(false);
    }
    fetch();
  }, [id]);

  return (
    <div className={styles.mainContainer}>
      {isLoading && (
        <div className={styles.loading}>
          <svg viewBox="25 25 50 50" className={styles.loaderContainer}>
            <circle cx="50" cy="50" r="20" className={styles.loader}></circle>
          </svg>
        </div>
      )}
      <div className={styles.quizRegisterForm}>
        <div className={styles.heading}>Register for the Course</div>
        <div>
          <div className={styles.viewDetailsRow}>
            <div>Name</div>
            <div>{dataSet?.userName}</div>
          </div>
          <div className={styles.viewDetailsRow}>
            <div>Email</div>
            <div>{dataSet?.email}</div>
          </div>
          <div className={styles.viewDetailsRow}>
            <div>Phone Number</div>
            <div>{dataSet?.phone}</div>
          </div>
          <div className={styles.viewDetailsRow}>
            <div>Target Year</div>
            <div>{dataSet?.course.targetYear}</div>
          </div>
          <div className={styles.viewDetailsRow}>
            <div>Course interested</div>
            <div>{dataSet?.course.name}</div>
          </div>
          <div className={styles.viewDetailsRow}>
            <div>Payment</div>
            <div>
              <Image
                src={dataSet?.paymentImg}
                width={180}
                height={200}
                alt="Picture of the payment"
              />
            </div>
          </div>
          <div style={{ marginTop: "20px" }}>
            <h1>
              Thank you for Register for the Course.
              <div style={{ marginTop: "20px" }}>
                All the best. Prepare hard.
              </div>
            </h1>
          </div>
          <button
            type="button"
            className={styles.submitButton}
            onClick={() => router.push("/quiz")}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Success;
