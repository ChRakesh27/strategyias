"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Quiz() {
  const [topic, setTopic] = useState({
    _id: "",
    questions: [
      {
        _id: "",
        text: "",
        options: [],
        link: "",
        correctOption: "",
        solutionTextmain: "",
      },
    ],
    link: "",
  });

  const [isAnswered, setIsAnswered] = useState(false);
  const [quesNo, setQuesNo] = useState(0);
  const [valueInd, setValueIndex] = useState();
  const [offset, setOffset] = useState(0);
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/getQuiz?offset=" + offset);
      console.log("🚀 ~ fetchData ~ response:", response);
      setTopic(response.data.res);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const inCorrectIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-x-circle"
      viewBox="0 0 16 16"
    >
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
    </svg>
  );

  const correctIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-check2-circle"
      viewBox="0 0 16 16"
    >
      <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
      <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
    </svg>
  );
  function selectHandler(e) {
    if (isAnswered) {
      return;
    }

    const value = e.target.textContent;
    const valueIndex = topic?.questions[quesNo].options.findIndex(
      (ele) => ele == value
    );
    setValueIndex(valueIndex);
    const correctOptionIndex = letterToNumber(
      topic?.questions[quesNo].correctOption
    );
    if (valueIndex == correctOptionIndex) {
      e.currentTarget.classList.add("option-correct");
    } else {
      e.currentTarget.classList.add("option-incorrect");
      let correctDomEle =
        document.querySelectorAll(".option")[correctOptionIndex];
      correctDomEle.classList.add("option-correct");
    }
    setIsAnswered(true);
  }

  function letterToNumber(letter) {
    letter = letter.toLowerCase();
    return letter.charCodeAt(0) - 97;
  }

  function onNext() {
    setIsAnswered(false);
    let correctDomEle = document.querySelectorAll(".option-correct")[0];
    let IncorrectDomEle = document.querySelectorAll(".option-incorrect")[0];
    if (correctDomEle) {
      correctDomEle.classList.remove("option-correct");
    }
    if (IncorrectDomEle) {
      IncorrectDomEle.classList.remove("option-incorrect");
    }
    setQuesNo((val) => ++val);
    if (quesNo >= topic.questions.length - 1) {
      setQuesNo(0);
      setOffset((val) => ++val);
      // fetchData();
    }
  }
  function onPrevious() {
    if (quesNo > 0) {
      setQuesNo((val) => --val);
    } else {
      // if (offset > 0) setOffset((val) => --val);
    }
  }
  return (
    <>
      <div className="quiz">
        <div className="cart">
          <div className="cart-header">
            <p>Question:</p>
            {topic?.questions[quesNo].text}
          </div>
          <div className="cart-body">
            <div className="option-list">
              {topic?.questions[quesNo].options.map((ele, index) => {
                return (
                  <div
                    className="option"
                    key={index}
                    onClick={(event) => selectHandler(event)}
                  >
                    <span>{ele}</span>
                    {isAnswered && (
                      <>
                        {letterToNumber(
                          topic?.questions[quesNo].correctOption
                        ) == index
                          ? correctIcon
                          : index == valueInd
                          ? inCorrectIcon
                          : ""}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
            {isAnswered && (
              <div>
                <div className="note">
                  {topic?.questions[quesNo].solutionTextmain}
                </div>
                <div className="own-note">
                  <textarea
                    className="own-note-text-input"
                    placeholder={"Add-Note"}
                  ></textarea>
                </div>
              </div>
            )}
          </div>
          <hr />
          <div className="cart-footer">
            <div className="btn-nex-pre">
              <button className="btn btn-outline-primary" onClick={onPrevious}>
                Previous
              </button>
              <button className="btn btn-outline-success" onClick={onNext}>
                Next
              </button>
            </div>
            <div className="btn-Submit">
              <button className="btn btn-outline-orange">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
