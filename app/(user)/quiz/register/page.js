"use client";
import React, { useState } from "react";
import styles from "../../(styles)/quizRegister.module.css";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function Register() {
  const { data: session } = useSession();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isPayment, setIsPayment] = useState(false);
  const [formData, setFormData] = useState({
    registerAt: "",
    expireAt: "",
    email: session?.user.email,
    userName: session?.user.name,
    phone: "",
    paymentImg: "",
    course: {},
  });

  const targetYearsList = [2024, 2023];

  const coursesList = [
    { id: "TS_BWMP", name: "Book wise MCQ Practice" },
    { id: "TS_SWMP", name: "Subject wise MCQ Practice" },
    { id: "TS_TWMP", name: "Topic wise MCQ Practice" },
    { id: "TS_10QD", name: "10 Questions / day" },
    { id: "TS_50QD", name: "50 Questions / Day" },
    { id: "TS_100QD", name: "100 Questions / Day" },
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
      expireAt: oneYearLater.toISOString(),
    };

    const response = await axios.post("/api/quiz/registerCourse", payload);
    setIsLoading(false);
    if (response.status === 200) {
      router.push("/quiz");
    }
  }
  const copyToClipboard = () => {
    navigator.clipboard.writeText("okias@jio");
  };

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
            <div className={styles.heading}>Register for the Course</div>
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
                    <div className={styles.label}>Target Year</div>
                    <select
                      className={styles.formControlInput}
                      onChange={(e) =>
                        setFormData((val) => {
                          return {
                            ...val,
                            course: {
                              ...val.course,
                              targetYear: e.target.value,
                            },
                          };
                        })
                      }
                      defaultValue={""}
                      required
                    >
                      <option disabled value={""}>
                        Select Target Year
                      </option>
                      {targetYearsList.map((ele, index) => {
                        return (
                          <option value={ele} key={index}>
                            {ele}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    <div className={styles.label}>Course interested</div>
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
                        Select Course
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
                    <div style={{ fontSize: "28px" }}>
                      okias@jio
                      <button
                        onClick={copyToClipboard}
                        style={{
                          border: "none",
                          background: "transparent",
                          marginLeft: "10px",
                        }}
                      >
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-copy"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                          />
                        </svg>
                      </button>
                    </div>
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

export default Register;
