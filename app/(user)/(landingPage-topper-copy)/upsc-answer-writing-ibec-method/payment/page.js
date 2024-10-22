"use client";
import React, { useState } from "react";
import styles from "../../../(styles)/quizRegister.module.css";
import Link from "next/link";
// import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function Payment() {
  const { data: session } = useSession();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isPayment, setIsPayment] = useState(false);
  const [formData, setFormData] = useState({
    email: session?.user.email,
    userName: session?.user.name,
    phone: "",
    paymentImg: "",
    course: {},
  });

  const coursesList = [
    { id: "all", name: "ALL" },
    { id: "essay", name: "ESSAY" },
    { id: "gs1", name: "GS1" },
    { id: "gs2", name: "GS2" },
    { id: "gs3", name: "GS3" },
    { id: "gs4", name: "GS4" },
  ];

  function uploadedImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (evt) => {
      setFormData((val) => {
        return { ...val, paymentImg: evt.target.result };
      });
    };
    reader.onerror = (evt) => {
      alert("error file loading");
    };
  }

  async function onSubmitHandler(e) {
    e.preventDefault();
    setIsLoading(true);
    const date = new Date();
    const oneYearLater = new Date(date);
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
    const payload = {
      ...formData,
      registerAt: date.toISOString(),
    };
    console.log("🚀 ~ onSubmitHandler ~ payload:", payload);

    // const response = await axios.post("/api/quiz/registerCourse", payload);
    setIsLoading(false);
    // if (response.status === 200) {
    router.push("/upsc-answer-writing-ibec-method");
    // }
  }

  return (
    <>
      <div className={styles.mainContainer}>
        {isLoading && (
          <div className={styles.loading}>
            <svg viewBox="25 25 50 50" className={styles.loaderContainer}>
              <circle cx="50" cy="50" r="20" className={styles.loader}></circle>
            </svg>
          </div>
        )}
        <div>
          <div className={styles.landingPageIcon}>
            <Link href={"/"}>
              <h3>STRATEGY IAS</h3>
            </Link>
          </div>
          <div className={styles.quizRegisterForm}>
            <div className={styles.heading}>Buy Toppers Copies</div>
            <form onSubmit={onSubmitHandler}>
              {!isPayment ? (
                <>
                  <div>
                    <div className={styles.label}>Name</div>
                    <input
                      className={styles.formControlInput}
                      type="text"
                      defaultValue={session?.user.name}
                      onChange={(e) =>
                        setFormData((val) => {
                          return { ...val, userName: e.target.value };
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <div className={styles.label}>Email</div>
                    <input
                      className={styles.formControlInput}
                      type="email"
                      defaultValue={session?.user.email}
                      onChange={(e) =>
                        setFormData((val) => {
                          return { ...val, email: e.target.value };
                        })
                      }
                      required
                    ></input>
                  </div>
                  <div>
                    <div className={styles.label}>Phone Number</div>
                    <input
                      className={styles.formControlInput}
                      type="number"
                      onChange={(e) =>
                        setFormData((val) => {
                          return { ...val, phone: e.target.value };
                        })
                      }
                      required
                    ></input>
                  </div>
                  <div>
                    <div className={styles.label}>Toppers Copy</div>
                    <select
                      className={styles.formControlInput}
                      onChange={(e) => {
                        setFormData((val) => {
                          return {
                            ...val,
                            course: {
                              ...val.course,
                              id: e.target.value,
                              name: coursesList.find(
                                (ele) => ele.id == e.target.value
                              ).name,
                            },
                          };
                        });
                      }}
                      defaultValue={""}
                      required
                    >
                      <option disabled value={""}>
                        Select Copy
                      </option>
                      {coursesList.map((ele, index) => {
                        return (
                          <option value={ele.id} key={index}>
                            {ele.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <button
                    type="button"
                    className={styles.submitButton}
                    onClick={() => setIsPayment(true)}
                  >
                    Next
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <div className={styles.label}>UPI</div>
                    <Image
                      src="/UPI-QR.jpg"
                      width={300}
                      height={320}
                      className={styles.wotssoBodyImage}
                      alt="Picture of the author"
                    />
                  </div>
                  <div>
                    <div className={styles.label}>
                      Upload Payment Screenshot
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className={styles.formControlFile}
                      onChange={uploadedImage}
                      required
                    ></input>
                  </div>
                  <button type="submit" className={styles.submitButton}>
                    Submit
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
