"use client";

import { useState } from "react";

export default function Quiz() {
  const ques = [
    {
      id: 278738,
      link: "https://www.insightsonindia.com/2023/12/08/mission-2024-static-quiz-08-december-2023-polity/",
      questions: [
        {
          id: 1,
          link: "https://www.insightsonindia.com/2023/12/08/mission-2024-static-quiz-08-december-2023-polity/",
          text: "Consider the following statements regarding ‘Objectives resolution’. The resolution laid down the fundamentals and philosophy of the constitutional structure. This Resolution was unanimously adopted by the Constituent Assembly. It missed out on the safeguards for minorities, backward and tribal areas. How many of the above statements is/are correct?",
          options: ["a) Only one", "b) Only two", "c) All three", "d) None"],
          correctOption: "b",
          solutionTextmain:
            "Correct Solution: b) Statement 3 is incorrect. In December, 1946, Jawaharlal Nehru moved the historic ‘Objectives Resolution’ in the Assembly. It laid down the fundamentals and philosophy of the constitutional structure. It included the major values and ideals of sovereignty, republic, fundamental rights, directive principles, non-interference etc. It sought to secure to ideals mentioned in the Preamble. It provided for adequate safeguards for minorities, backward and tribal areas, and depressed and other backward classes. This Resolution was unanimously adopted by the Assembly on January 22, 1947. It influenced the eventual shaping of the constitution through all its subsequent stages. Its modified version forms the Preamble of the present Constitution.",
        },
        {
          id: 2,
          link: "https://www.insightsonindia.com/2023/12/08/mission-2024-static-quiz-08-december-2023-polity/",
          text: "Consider the following statements. With the commencement of the Constitution, all the acts passed during the British Era was repealed. All the parts of the constitution was enforced on August 1947. Which of the above statements is/are incorrect?",
          options: [
            "a) 1 only",
            "b) 2 only",
            "c) Both 1 and 2",
            "d) Neither 1 nor 2",
          ],
          correctOption: "c",
          solutionTextmain:
            "Correct Solution: c) With the commencement of the Constitution, the Indian Independence Act of 1947 and the Governmentof India Act of 1935, with all enactments amending or supplementing the latter Act, were repealed. The Abolition of Privy Council Jurisdiction Act (1949) was however continued. Some provisions of the Constitution pertaining to citizenship, elections, provisional parliament,temporary and transitional provisions, and short title contained in Articles 5, 6, 7, 8, 9, 60, 324, 366,367, 379, 380, 388, 391, 392 and 393 came into force on November 26, 1949 itself.The remaining provisions (the major part) of the Constitution came into force on January 26, 1950.",
        },
      ],
    },
    {
      id: 278624,
      link: "https://www.insightsonindia.com/2023/12/07/mission-2024-static-quiz-07-december-2023-history/",
      questions: [
        {
          id: 6,
          link: "https://www.insightsonindia.com/2023/12/07/mission-2024-static-quiz-07-december-2023-history/",
          text: "The Poligar revolt of early 19th Century was rooted in",
          options: [
            "a) General discontentment with foreign rule",
            "b) Oppressive land revenue system",
            "c) Control of tribal forests and river streams by British government",
            "d) Enmity of tribals with non-tribals",
          ],
          correctOption: "b",
          solutionTextmain:
            "Correct Solution: b) The Polygar Wars or Palaiyakkarar Wars were fought between the Polygars of the former Tirunelveli Kingdom in Tamil Nadu and the British East India Company forces between 1799 to 1805 over pending taxes, oppressive land revenue system etc. The British finally won after carrying out gruelling protracted jungle campaigns against the Polygar armies and finally defeated them. The British victory over the Polygars brought large parts of the territories of Tamil Nadu under British control, enabling them to get a strong hold in Southern India.",
        },
      ],
    },
  ];
  const inCorrectIcon = `<svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-x-circle"
      viewBox="0 0 16 16"
    >
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
    </svg>`;

  const correctIcon = `<svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-check2-circle"
      viewBox="0 0 16 16"
    >
      <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
      <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
    </svg>`;
  const [isSubmit, setisSubmit] = useState(false);
  let selectOption = "";

  function selectHandler(e) {
    if (isSubmit) {
      return;
    }
    e.target.classList.add("option-select");
    if (selectOption != "") {
      selectOption.target.classList.remove("option-select");
    }
    selectOption = e;
    onSubmit();
  }

  function onSubmit() {
    if (isSubmit) {
      return;
    }
    const value = selectOption.target.textContent;
    const valueIndex = ques[0].questions[0].options.findIndex(
      (ele) => ele == value
    );
    const correctOptionIndex = letterToNumber("b");
    if (valueIndex == correctOptionIndex) {
      selectOption.target.classList.add("option-correct");
      selectOption.target.innerHTML += correctIcon;
    } else {
      selectOption.target.classList.add("option-incorrect");
      selectOption.target.innerHTML += inCorrectIcon;
      let correctDomEle =
        document.querySelectorAll(".option")[correctOptionIndex];
      correctDomEle.innerHTML += correctIcon;
      correctDomEle.classList.add("option-correct");
    }
    setisSubmit(true);
  }

  function letterToNumber(letter) {
    letter = letter.toLowerCase();
    return letter.charCodeAt(0) - 97;
  }
  return (
    <>
      <div className="quiz">
        <div className="cart">
          <div className="cart-header">
            <p>Question:</p>
            {ques[0].questions[0].text}
          </div>
          <div className="cart-body">
            <div className="option-list">
              {ques[0].questions[0].options.map((ele, index) => {
                return (
                  <div
                    className="option"
                    key={index}
                    onClick={(event) => selectHandler(event)}
                  >
                    <span>{ele}</span>
                  </div>
                );
              })}
            </div>
            {isSubmit && (
              <div>
                <div className="note">
                  {ques[0].questions[0].solutionTextmain}
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
            <button className="btn btn-outline-primary">Previous</button>
            <button className="btn btn-outline-orange" onClick={onSubmit}>
              Submit
            </button>
            <button className="btn btn-outline-success">Next</button>
          </div>
        </div>
      </div>
    </>
  );
}
