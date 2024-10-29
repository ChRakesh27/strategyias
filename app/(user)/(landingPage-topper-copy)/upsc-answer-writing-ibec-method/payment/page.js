"use client";
import React, { useState } from "react";
import styles from "../../../(styles)/quizRegister.module.css";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function Payment() {
  const { data: session } = useSession();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isPayment, setIsPayment] = useState(false);
  const [createdId, setCreatedId] = useState("");
  const [formData, setFormData] = useState({
    email: session?.user.email,
    userName: session?.user.name,
    phone: "",
    paymentImg: "",
    typeOfCopy: "",
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText("okias@jio");
  };

  async function onSubmitHandler(e) {
    e.preventDefault();
    if (!createdId) {
      return;
    }
    setIsLoading(true);
    const date = new Date();
    const oneYearLater = new Date(date);
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
    const payload = {
      ...formData,
      registerAt: date.toISOString(),
      id: createdId,
    };
    const response = await axios.post("/api/ibec/updateUsers", payload);
    setIsLoading(false);
    if (response.status === 200) {
      const encodedId = btoa(createdId);
      router.push(
        "/upsc-answer-writing-ibec-method/payment/success?id=" + encodedId
      );
    }
  }

  async function onNextHandler(e) {
    e.preventDefault();
    setIsLoading(true);
    const date = new Date();
    const oneYearLater = new Date(date);
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
    const payload = {
      ...formData,
      registerAt: date.toISOString(),
    };

    const response = await axios.post("/api/ibec/createUser", payload);
    setCreatedId(response.data._id);
    if (response.status === 200) {
      setIsPayment(true);
    }
    setIsLoading(false);
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
          {/* <div className={styles.landingPageIcon}>
            <Link href={"/"}>
              <h3>STRATEGY IAS</h3>
            </Link>
          </div> */}
          <div className={styles.quizRegisterForm}>
            <div className={styles.heading}>Buy Toppers Copies</div>
            {!isPayment ? (
              <form onSubmit={onNextHandler}>
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
                      type="text"
                      maxLength="10"
                      pattern="\d{10}"
                      title="Please enter exactly 10 digits"
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
                            typeOfCopy: e.target.value,
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
                          <option value={ele.name} key={index}>
                            {ele.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <button type="submit" className={styles.submitButton}>
                    Next
                  </button>
                </>
              </form>
            ) : (
              <form onSubmit={onSubmitHandler}>
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
                          className="bi bi-copy"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
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
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
