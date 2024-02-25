"use client";

import {  useRef } from "react";
import React from "react";
import styles from "../../(styles)/(form-style)/pyqs.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import dynamic from "next/dynamic";


const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
const CurrentAffairsForm = () => {
  const router = useRouter();
  const editor = useRef(null);
  const editor2 = useRef(null);
  const optionArray = ["A", "B", "C", "D"];
  //   const [content, setContent] = useState("");
  const [formData, setFormData] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    solution: "",
    correctOption: "",
  });

  const [errorAlerts, setErrorAlerts] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    solution: "",
    correctOption: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const handleTextEditor = (name, content) => {
    if (name === "question") {
      setFormData((prevData) => ({
        ...prevData,
        question: content,
      }));
    }
    if (name === "solution") {
      setFormData((prevData) => ({
        ...prevData,
        solution: content,
      }));
    }
  };
  const handleInputChange = (e, type) => {
    setErrorAlerts((prevData) => ({
      ...prevData,
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      solution: "",
      correctOption: "",
    }));
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleOptionSelect = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      correctOption: data,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.question) {
      setErrorAlerts((prevData) => ({
        ...prevData,
        question: "question is required",
      }));
      return;
    } else if (!formData.option1) {
      setErrorAlerts((prevData) => ({
        ...prevData,
        option1: "option 1 is required",
      }));
      return;
    } else if (!formData.option2) {
      setErrorAlerts((prevData) => ({
        ...prevData,
        option2: "option 2 is required",
      }));
      return;
    } else if (!formData.option3) {
      setErrorAlerts((prevData) => ({
        ...prevData,
        option3: "option 3 is required",
      }));
      return;
    } else if (!formData.option4) {
      setErrorAlerts((prevData) => ({
        ...prevData,
        option4: "option 4 is required",
      }));
      return;
    } else if (!formData.solution) {
      setErrorAlerts((prevData) => ({
        ...prevData,
        solution: "solution  is required",
      }));
      return;
    } else if (!formData.correctOption) {
      setErrorAlerts((prevData) => ({
        ...prevData,
        correctOption: "correct Option  is required",
      }));
      return;
    }

    setIsLoading(true);

    const pyqs = {
      question: formData.question,
      option1: formData.option1,
      option2: formData.option2,
      option3: formData.option3,
      option4: formData.option4,
      solution: formData.solution,
      correctOption: formData.correctOption,
    };

    try {
      const res = await fetch("/api/admin/add-currentAffairs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pyqs),
      });

      if (res.status === 200) {
        setIsLoading(false);
        router.push("/admin/toppers-page");
      } else {
        setIsLoading(false);
      }
    } catch (error) {
   
      alert(error);
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.all}>
      <div className={styles.questionFormContainer}>
        <form onSubmit={handleSubmit} className={styles.questionForm} action="">
          <div className={styles.formHeading}>
            <h1>
              Add <span>Current affairs questions</span>{" "}
            </h1>
          </div>

          <div className={styles.formInsideContainer}>
            <div className={styles.firstHalf}>
              <div className={styles.inputDiv}>
                <h2>Question Text:</h2>
                {errorAlerts.question && (
                  <div className={styles.alertBox}>
                    {" "}
                    <p>{errorAlerts.question}</p>
                  </div>
                )}

                <JoditEditor
                  ref={editor}
                  //   value={content}
                  tabIndex={1}
                  onBlur={(newContent) =>
                    handleTextEditor("question", newContent)
                  }
                  onChange={(newContent) => {}}
                />
              </div>

              <div className={styles.inputDiv}>
                <input
                  type="text"
                  placeholder="option1 *"
                  name="option1"
                  value={formData.option1}
                  onChange={handleInputChange}
                />
                {errorAlerts.option1 && (
                  <div className={styles.alertBox}>
                    {" "}
                    <p>{errorAlerts.option1}</p>
                  </div>
                )}
              </div>

              <div className={styles.inputDiv}>
                <input
                  type="text"
                  placeholder="option2 *"
                  name="option2"
                  value={formData.option2}
                  onChange={handleInputChange}
                />
                {errorAlerts.option2 && (
                  <div className={styles.alertBox}>
                    {" "}
                    <p>{errorAlerts.option2}</p>
                  </div>
                )}
              </div>
              <div className={styles.inputDiv}>
                <input
                  type="text"
                  name="option3"
                  placeholder="option3 *"
                  value={formData.option3}
                  onChange={handleInputChange}
                />
                {errorAlerts.option3 && (
                  <div className={styles.alertBox}>
                    {" "}
                    <p>{errorAlerts.option3}</p>
                  </div>
                )}
              </div>
              <div className={styles.inputDiv}>
                <input
                  type="text"
                  name="option4"
                  placeholder="option4 *"
                  value={formData.option4}
                  onChange={handleInputChange}
                />
                {errorAlerts.option4 && (
                  <div className={styles.alertBox}>
                    {" "}
                    <p>{errorAlerts.option4}</p>
                  </div>
                )}
              </div>
              <div className={styles.inputDiv}>
                <div className={styles.optionsDiv}>
                  <h2>Select correct option</h2>
                  <div>
                    {optionArray.map((data, i) => (
                      <div
                        onClick={() => handleOptionSelect(data)}
                        className={
                          styles.correctOption +
                          `${
                            formData.correctOption === data
                              ? " " + styles.selectedOption
                              : ""
                          }`
                        }
                        key={i}
                      >
                        {data}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.inputDiv}>
                <h2>Solution Text:</h2>

                {errorAlerts.solution && (
                  <div className={styles.alertBox}>
                    {" "}
                    <p>{errorAlerts.solution}</p>
                  </div>
                )}

                <JoditEditor
                  ref={editor2}
                  //   value={content}
                  tabIndex={1} // tabIndex of textarea
                  onBlur={(newContent) =>
                    handleTextEditor("solution", newContent)
                  } // preferred to use only this option to update the content for performance reasons
                  onChange={(newContent) => {}}
                />
              </div>
            </div>
          </div>

          <div className={styles.btnHolder}>
            <button
              type="submit"
              disabled={isLoading}
              className={styles.submitQuestionForm}
            >
              {isLoading && <span>Adding...</span>}
              {!isLoading && <span>Add Question </span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CurrentAffairsForm;
