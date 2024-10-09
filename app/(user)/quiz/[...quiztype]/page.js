"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { test_series } from "../courses";
import { useRouter } from "next/navigation";

export default function Quiz({ params }) {
  const [dataSet, setDataSet] = useState([]);
  const { data: session } = useSession();
  const [isAnswered, setIsAnswered] = useState([]);
  const [result, setResult] = useState({ correct: 0, inCorrect: 0 });
  const [quesNo, setQuesNo] = useState(0);
  const [timeLeft, setTimeLeft] = useState();
  const [registeredCourse, setRegisteredCourse] = useState();
  const [isStart, setIsStart] = useState(false);
  const [isTestEnd, setIsTestEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [countReview, setCountReview] = useState({
    attempted: 0,
    unAttempted: 0,
  });
  const [openSubmitConfirmationBox, setOpenSubmitConfirmationBox] =
    useState(false);
  const router = useRouter();

  const fetchData = async () => {
    try {
      setIsLoading(true);

      if (!session?.user) {
        setIsLoading(false);
        router.push("/quiz");
        return;
      }

      let registerDetails = await axios.get(
        "/api/quiz/getQuizUser?email=" +
          session?.user.email +
          "&courseId=" +
          params.quiztype[0]
      );

      // let registerDetails = await axios.get(
      //   "/api/quiz/getQuizUser?email=person1@gmail.com&courseId=" +
      //     params.quiztype[0]
      // );

      if (!registerDetails.data.res) {
        router.push("/quiz");
      }

      setRegisteredCourse(registerDetails.data.res);

      let response = {};
      response = await axios.get(
        "/api/quiz/getQuiz?userId=" + registerDetails.data.res._id
      );

      setDataSet(response.data.res);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (!isStart || isTestEnd) {
      return;
    }

    if (timeLeft === 0) {
      setIsTestEnd(true);
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, isStart, isTestEnd]);

  const formatTime = (seconds) => {
    const minutes = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const hours = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const secondsLeft = (seconds % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${secondsLeft}`;
  };

  useEffect(() => {
    fetchData();
    setTimeLeft(
      test_series.find((ele) => ele.id == params.quiztype[0]).time * 60
    );
  }, [params.quiztype]);

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

  function CheckIsAnswered(index = quesNo) {
    return isAnswered.find((ele) => ele._id == dataSet[index]._id);
  }

  async function selectHandler(e) {
    if (!!CheckIsAnswered()) {
      return;
    }

    const value = e.target.textContent;
    const valueIndex = dataSet[quesNo].options.findIndex((ele) => ele == value);

    const correctOptionIndex = dataSet[quesNo].correctOption;

    const payload = {
      userId: registeredCourse._id,
      data: {
        questionId: dataSet[quesNo]._id,
        selectedOption: +valueIndex,
        correctOption: +correctOptionIndex,
        date: new Date().toISOString(),
        note: "",
      },
    };

    const response = await axios.post("/api/quiz/updateQuizUser", payload);
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

  function onHandlerStart() {
    setIsStart(true);
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

  async function noteInputHandular(e) {
    const payload = {
      userId: registeredCourse._id,
      questionId: dataSet[quesNo]._id,
      note: e.target.value,
    };
    const response = await axios.post(
      "/api/quiz/updateQuizUser?note=true",
      payload
    );
    isAnswered.map((ele) => {
      if (ele._id == dataSet[quesNo]._id) {
        ele.note = e.target.value;
      }
      return ele;
    });
    setIsAnswered(isAnswered);
  }
  function calculateResult() {
    const correct = isAnswered.filter(
      (ele) => ele.selectedOption == ele.correctOption
    ).length;
    setResult({ correct, inCorrect: isAnswered.length - correct });
  }
  function onSubmit() {
    calculateResult();
    countMarkedQuestion();
    setOpenSubmitConfirmationBox(true);
  }

  function markedReview(isMarked) {
    dataSet[quesNo].reviewMarked = isMarked;
    setDataSet(dataSet);
  }

  function countMarkedQuestion() {
    dataSet.forEach((ele, index) => {
      if (ele?.reviewMarked) {
        let isAnswered = CheckIsAnswered(index);
        if (isAnswered) {
          setCountReview((val) => ({
            ...val,
            attempted: val.attempted + 1,
          }));
        } else {
          setCountReview((val) => ({
            ...val,
            unAttempted: val.unAttempted + 1,
          }));
        }
      }
    });
  }
  const containerClassName = session?.user.role === "admin" ? "adminQuiz" : "";

  return (
    <>
      <div className={"quiz " + containerClassName}>
        {isTestEnd && (
          <div className="isSubmit">
            <div class="subConfirmationBox">
              <div className="testEnd">Test has been finished...</div>
              <div class="sub-details">
                <span>Total Questions</span>
                <span>{dataSet.length}</span>
              </div>
              <div className="sub-details ques-a">
                <span>ATTEMPTED</span>
                <span>{isAnswered.length}</span>
              </div>
              <div className="sub-details ques-mra">
                <span>CORRECT</span>
                <span>{result.correct}</span>
              </div>
              <div className="sub-details ques-mrua">
                <span>INCORRECT</span>
                <span>{result.inCorrect}</span>
              </div>
              <div className="res-footer">
                <button
                  className="sub-test"
                  onClick={() => {
                    router.push("/quiz");
                  }}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        )}
        {openSubmitConfirmationBox && !isTestEnd && (
          <div className="isSubmit">
            <div className="subConfirmationBox">
              <div className="sub-details">
                <span className="">Total Questions</span>
                <span>{dataSet.length}</span>
              </div>
              <div className="sub-details ques-a">
                <span>ATTEMPTED</span>
                <span>{isAnswered.length}</span>
              </div>
              <div className="sub-details ques-ua">
                <span>UNATTEMPTED</span>
                <span>{dataSet.length - isAnswered.length}</span>
              </div>
              <hr />
              <div className="sub-details ques-mra">
                <span>MARKED FOR REVIEW(ATTEMPTED)</span>
                <span>{countReview.attempted}</span>
              </div>
              <div className="sub-details ques-mrua">
                <span>MARKED FOR REVIEW(UNATTEMPTED)</span>
                <span>{countReview.unAttempted}</span>
              </div>
              <button
                className="sub-test"
                onClick={() => {
                  setIsTestEnd(true);
                }}
              >
                SUBMIT TEST
              </button>
              <button
                className="res-test"
                onClick={() => {
                  setOpenSubmitConfirmationBox(false);
                  setCountReview({ attempted: 0, unAttempted: 0 });
                }}
              >
                RESUME TEST
              </button>
            </div>
          </div>
        )}
        {!isStart && (
          <div className="isStart">
            {isLoading ? (
              <div className="loading">Loading...</div>
            ) : (
              <button className="startBtn" onClick={onHandlerStart}>
                Start
              </button>
            )}
          </div>
        )}
        {isStart && !isTestEnd && !openSubmitConfirmationBox && (
          <>
            <div className="questionList">
              <ol className="que-ol">
                {dataSet.map((ele, index) => (
                  <li
                    className={
                      "que-li " +
                      (quesNo == index ? "que-select " : "") +
                      (ele?.reviewMarked
                        ? CheckIsAnswered(index)
                          ? "marQuesAns"
                          : "marQues"
                        : "")
                    }
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
            <div className="quizBody">
              <div className="quizTime">
                <h3>Time Remaining: {formatTime(timeLeft)}</h3>
                <hr />
              </div>
              <div className="cart">
                <div className="cart-header">
                  <p className="question">
                    Question:
                    {!dataSet[quesNo]?.reviewMarked ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        className="bi bi-star"
                        viewBox="0 0 16 16"
                        onClick={() => {
                          markedReview(true);
                        }}
                      >
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        class="bi bi-star-fill"
                        viewBox="0 0 16 16"
                        onClick={() => {
                          markedReview(false);
                        }}
                      >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                    )}
                  </p>
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
                              {dataSet[quesNo].correctOption == index &&
                                correctIcon}
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
                    <button
                      className="btn btn-outline-primary"
                      onClick={onPrevious}
                    >
                      Previous
                    </button>
                    <button
                      className="btn btn-outline-success"
                      onClick={onNext}
                    >
                      Next
                    </button>
                  </div>
                  <div className="btn-Submit">
                    <button
                      className="btn btn-outline-orange"
                      onClick={onSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
