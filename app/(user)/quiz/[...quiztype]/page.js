"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function Quiz({ params }) {
  const [dataSet, setDataSet] = useState([
    {
      _id: "",
      text: "",
      options: [],
      correctOption: "",
      solutionTextmain: "",
    },
  ]);
  const { data: session } = useSession();

  const [isAnswered, setIsAnswered] = useState([]);
  const [quesNo, setQuesNo] = useState(0);
  const fetchData = async () => {
    try {
      let response = {};

      response = await axios.get(
        "/api/quiz/getQuiz?quizType=" + params.quiztype[0]
      );
      setDataSet(response.data.res);

      // const response = await axios.get("/api/quiz/getQuestions");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
    console.log("🚀 ~ Quiz ~ session:", session?.user);
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
  function CheckIsAnswered() {
    return isAnswered.find((ele) => ele._id == dataSet[quesNo]._id);
  }
  function selectHandler(e) {
    if (!!CheckIsAnswered()) {
      return;
    }

    const value = e.target.textContent;
    const valueIndex = dataSet[quesNo].options.findIndex((ele) => ele == value);

    const correctOptionIndex = dataSet[quesNo].correctOption;
    setIsAnswered((oldData) => [
      ...oldData,
      {
        userId: "",
        _id: dataSet[quesNo]._id,
        topicId: dataSet[quesNo]._id,
        selectedOption: +valueIndex,
        correctOption: +correctOptionIndex,
        note: "",
      },
    ]);
  }

  function onNext() {
    if (quesNo < dataSet.length - 1) {
      setQuesNo((val) => val + 1);
    }
  }

  function onPrevious() {
    if (quesNo <= 0) {
      return;
    }
    setQuesNo((val) => val - 1);
  }

  function onSelectQuestion(index) {
    setQuesNo(index);
  }

  function setbg(index) {
    const data = CheckIsAnswered();
    if (!data) {
      return;
    }
    if (data.correctOption == index) {
      return "option-correct";
    }
    if (data.selectedOption == index) {
      return "option-incorrect";
    }
  }

  function noteInputHandular(e) {
    isAnswered.map((ele) => {
      if (ele._id == dataSet[quesNo]._id) {
        ele.note = e.target.value;
      }
      return ele;
    });
    setIsAnswered(isAnswered);
  }

  function onSubmit() {
    console.log("🚀 ~ onSubmit:", params.quiztype[0], isAnswered);
  }

  return (
    <>
      <div className="quiz">
        <div className="questionList">
          <ol className="que-ol">
            {dataSet.map((ele, index) => (
              <li
                className={"que-li " + (quesNo == index ? "que-select" : "")}
                key={index}
                onClick={() => {
                  onSelectQuestion(index);
                }}
                dangerouslySetInnerHTML={{
                  __html: ele.text.replace(/\n/g, ""),
                }}
              ></li>
            ))}
          </ol>
        </div>
        <div className="cart">
          <div className="cart-header">
            <p>Question:</p>
            <p
              dangerouslySetInnerHTML={{
                __html: dataSet[quesNo]?.text.replace(/\n/g, ""),
              }}
            ></p>
          </div>
          <div className="cart-body">
            <div className="option-list">
              {dataSet[quesNo]?.options?.map((ele, index) => {
                return (
                  <div
                    className={"option " + setbg(index)}
                    key={index}
                    onClick={(event) => selectHandler(event)}
                  >
                    <span>{ele}</span>
                    {CheckIsAnswered() && (
                      <>
                        {dataSet[quesNo].correctOption == index && correctIcon}
                        {CheckIsAnswered().selectedOption == index &&
                          CheckIsAnswered().correctOption != index &&
                          inCorrectIcon}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
            {CheckIsAnswered() && (
              <div>
                <div className="note">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: dataSet[quesNo]?.solutionTextmain.replace(
                        /\n/g,
                        ""
                      ),
                    }}
                  ></p>
                </div>
                <div className="own-note">
                  {!CheckIsAnswered().note && (
                    <textarea
                      className="own-note-text-input"
                      placeholder={"Add-Note"}
                      name="text-area"
                      onBlur={noteInputHandular}
                    ></textarea>
                  )}
                  {!!CheckIsAnswered().note && (
                    <div className="note">
                      <p>Note: {CheckIsAnswered().note}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="cart-footer">
            <hr />
            <div className="btn-nex-pre">
              <button className="btn btn-outline-primary" onClick={onPrevious}>
                Previous
              </button>
              <button className="btn btn-outline-success" onClick={onNext}>
                Next
              </button>
            </div>
            <div className="btn-Submit">
              <button className="btn btn-outline-orange" onClick={onSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
