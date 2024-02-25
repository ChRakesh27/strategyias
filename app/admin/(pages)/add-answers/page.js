"use client";
import { useEffect, useRef } from "react";
import React from "react";
import styles from "../../(styles)/(form-style)/QuestionForm.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import close from "../(utils)/close.png";
import axios from "axios";
import styles2 from "../../(styles)/(form-style)/AnswerForm.module.css";
import Image from "next/image";
const AnswerForm = () => {
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [ImageName, setImageName] = useState([]);
  const [formData, setFormData] = useState({
    testCode: "",
    questionNumber: "",
    questionText: "",
    answerText: "",
    answerImages: [],
    topperName: "",
    writtenBy: "", //Id for the topper
    paper: "",
    topicName: "",
    subtopicName: "",
    paperId: "",
    topicNameId: "",
    subtopicNameId: "",
  });
  const [errorAlerts, setErrorAlerts] = useState({
    testCode: "",
    questionNumber: "",
    questionText: "",
    writtenBy: "",
    image: "",
  });

  const [topicArray, setTopicArray] = useState([{ name: "", id: "" }]);
  const [subTopicArray, setSubTopicArray] = useState([
    { name: "", id: "", topicId: "" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // const [searchResultsPaper, setSearchResultsPaper] = useState([]);
  // const [searchResultsTopic, setSearchResultsTopic] = useState([]);
  // const [searchResultsSubTopic, setSearchResultsSubTopic] = useState([]);
  // const [answers, setAnswers] = useState([]);

  // const [showPaperOptions, setShowPaperOptions] = useState(false);
  // const [showTopicOptions, setShowTopicOptions] = useState(true);
  // const [showSubTopicOptions, setShowSubTopicOptions] = useState(false);

  const [paperFieldDis, setPaperFieldDis] = useState(false);
  const [writtenByFieldDis, setWrittenByFieldDis] = useState(false);

  // const [subTopicFieldDis, setSubTopicFieldDis] = useState(false);

  // const paperInputRef = useRef(null);
  // const topicInputRef = useRef(null);
  // const subTopicInputRef = useRef(null);

  const handleInputChange = (e) => {
    setErrorAlerts((prevData) => ({
      ...prevData,
      testCode: "",
      questionNumber: "",
      questionText: "",
      writtenBy: "",
      image: "",
    }));

    if (e.target.name === "writtenBy") {
      const { value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        topperName: value,
      }));
    } else {
      const { name, value } = e.target;

      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  //   This is getting all the users for adding the writtenBy field
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_DOMAIN}/api/getTopper`
        );

        setUsers(response.data.toppers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // fetching the papers
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get("/api/getPapers");
  //       setSearchResultsPaper(response.data.papers);
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //   };

  //   fetchUsers();
  // }, []);
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get("/api/getAnswers");
  //       setAnswers(response.data.answers);
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //   };

  //   fetchUsers();
  // }, []);
  const handleSelectForTopper = async (result) => {
    setFormData((prevData) => ({
      ...prevData,
      topperName: result.firstname,
      writtenBy: result._id,
    }));
    setWrittenByFieldDis(true);
  };

  // const handleSelect = async (fieldName, result) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [fieldName]: result.name,
  //     [`${fieldName}Id`]: result._id,
  //   }));
  //   if (fieldName === "paper") {
  //     setPaperFieldDis(true);
  //     try {
  //       const response = await axios.get(
  //         `/api/getTopics?paperId=${result._id}`
  //       );

  //       setSearchResultsTopic(response.data);
  //     } catch (error) {
  //       console.error(`Error fetching topics for the selected paper:`, error);
  //     }
  //   } else if (fieldName === "topicName") {
  //     if (
  //       topicArray.some(
  //         (topic) =>
  //           topic.name.toLowerCase() === formData.topicName.toLowerCase()
  //       )
  //     ) {
  //       alert(`${result.name} topic is already added`);
  //       return;
  //     }

  //     setTopicArray((prevData) => [
  //       ...prevData,
  //       { name: result.name, id: result._id },
  //     ]);

  //     try {
  //       const response = await axios.get(
  //         `/api/getSubTopics?topicId=${result._id}`
  //       );

  //       const updatedResults = response.data.map((item) => ({
  //         ...item,
  //         topicId: result._id, // Change parentId to the appropriate key
  //       }));

  //       setSearchResultsSubTopic((prevResults) => [
  //         ...prevResults,
  //         ...updatedResults,
  //       ]);

  //       setFormData((prevData) => ({
  //         ...prevData,
  //         topicName: "",
  //       }));
  //     } catch (error) {
  //       console.error(`Error fetching topics for the selected paper:`, error);
  //     }
  //   } else if (fieldName === "subtopicName") {
  //     setSubTopicArray((prevData) => [
  //       ...prevData,
  //       { name: result.name, id: result._id, topicId: result.topicId },
  //     ]);
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       subtopicName: "",
  //     }));
  //   }

  //   if (fieldName === "paper") setShowPaperOptions(false);
  //   else if (fieldName === "topicName") setShowTopicOptions(false);
  //   else if (fieldName === "subtopicName") setShowSubTopicOptions(false);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.testCode) {
      setErrorAlerts((prevData) => ({
        ...prevData,
        testCode: "Test Code is required",
      }));
      return;
    } else if (!formData.questionNumber) {
      setErrorAlerts((prevData) => ({
        ...prevData,
        questionNumber: "Question number is required",
      }));
      return;
    } else if (!formData.questionText) {
      setErrorAlerts((prevData) => ({
        ...prevData,
        questionText: "Question text is required",
      }));
      return;
    } else if (!formData.writtenBy) {
      setErrorAlerts((prevData) => ({
        ...prevData,
        writtenBy: "Written by is required",
      }));
      return;
    } else if (formData.answerImages.length === 0) {
      setErrorAlerts((prevData) => ({
        ...prevData,
        image: "Question Images is required",
      }));
      return;
    }
    setIsLoading(true);
    const question = {
      testCode: formData.testCode,
      questionNumber: formData.questionNumber,
      questionText: formData.questionText,
      answerText: formData.answerText,
      answerImages: formData.answerImages,
      writtenBy: formData.writtenBy,
      paper: formData.paper,

      paperId: formData.paperId,
      topicArray: topicArray,
      subTopicArray: subTopicArray,
    };

    try {
      const res = await fetch("/api/admin/AddAnswer", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(question),
      });

      if (res.status === 200) {
        setIsLoading(false);
        router.push("/Admin/AdminPage");
      } else {
        const data = await res.json();
        alert(
          "An error occurred. Please try again. Error message: " + data.message
        );
        setIsLoading(false);
      }
    } catch (error) {
      alert(error);
      setIsLoading(false);
    }
  };

  // const handleClear = (e) => {
  //   e.preventDefault();

  //   setImageName([]);
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     answerImages: [],
  //   }));
  // };
  const handleClearImage = (imageName) => {
    const index = formData.answerImages.findIndex(
      (image) => image.name === imageName
    );

    if (index !== -1) {
      const updatedAnswerImages = [...formData.answerImages];

      updatedAnswerImages.splice(index, 1);

      setFormData({
        ...formData,
        answerImages: updatedAnswerImages,
      });
    }
  };
  const clearField = (fieldName) => {
    if (fieldName === "writtenBy") {
      setWrittenByFieldDis(false);
      setFormData((prevData) => ({
        ...prevData,
        topperName: "",
        writtenBy: "",
      }));
    }
    if (fieldName === "paper") {
      setPaperFieldDis(false);
      setFormData((prevData) => ({
        ...prevData,
        paperId: "",
        paper: "",
      }));
    }
  };
  const handleImageUpload = async (e) => {
    const files = e.target.files;

    if (files.length > 0) {
      const newImages = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const base64Image = await convertToBase64(file);

        newImages.push({ name: file.name, data: base64Image });
      }

      setFormData((prevData) => ({
        ...prevData,
        answerImages: [...prevData.answerImages, ...newImages],
      }));
      setErrorAlerts((prevData) => ({
        ...prevData,
        testCode: "",
        questionNumber: "",
        questionText: "",
        writtenBy: "",
        image: "",
      }));
    }
  };

  // const addTopic = () => {
  //   if (
  //     topicArray.some(
  //       (topic) => topic.name.toLowerCase() === formData.topicName.toLowerCase()
  //     )
  //   ) {
  //     alert(`${formData.topicName} topic is already added`);
  //     return;
  //   }

  //   setTopicArray((prevData) => [
  //     ...prevData,
  //     { name: formData.topicName, id: "" },
  //   ]);
  // };
  // const addSubTopic = () => {
  //   if (
  //     subTopicArray.some(
  //       (topic) =>
  //         topic.name.toLowerCase() === formData.subtopicName.toLowerCase()
  //     )
  //   ) {
  //     alert(`${formData.subtopicName} topic is already added`);
  //     return;
  //   }

  //   setTopicArray((prevData) => [
  //     ...prevData,
  //     { name: formData.subtopicName, id: "" },
  //   ]);
  // };
  const handleImagePaste = async (e) => {
    if (e.clipboardData.items.length) {
      for (let i = 0; i < e.clipboardData.items.length; i++) {
        const newImages = [];
        if (e.clipboardData.items[i].type.indexOf("image") !== -1) {
          const fileObject = e.clipboardData.items[i].getAsFile();

          if (fileObject) {
            const base64Image = await convertToBase64(fileObject);

            newImages.push({ name: fileObject.name, data: base64Image });
            if (base64Image) {
              setFormData((prevData) => ({
                ...prevData,
                answerImages: [...prevData.answerImages, ...newImages],
              }));
              setErrorAlerts((prevData) => ({
                ...prevData,
                testCode: "",
                questionNumber: "",
                questionText: "",
                writtenBy: "",
                image: "",
              }));
            }
          }
        }
      }
    } else {
      alert(
        "No image data was found in your clipboard. Copy an image first or take a screenshot."
      );
    }
  };
  return (
    <div className={styles2.all}>
      <div className={styles2.questionFormContainer}>
        <form
          onSubmit={handleSubmit}
          className={styles2.questionForm}
          action=""
        >
          <div className={styles2.formHeading}>
            <h1>
              Add <span>Answers</span>{" "}
            </h1>
          </div>

          <div className={styles2.formInsideContainer}>
            <div className={styles2.firstHalf}>
              <div className={styles2.inputDiv}>
                <input
                  type="text"
                  name="testCode"
                  placeholder="Test Code *"
                  value={formData.testCode}
                  onChange={handleInputChange}
                />

                {errorAlerts.testCode && (
                  <div className={styles2.alertBox}>
                    {" "}
                    <p>{errorAlerts.testCode}</p>
                  </div>
                )}
              </div>

              <div className={styles2.inputDiv}>
                <input
                  type="number"
                  placeholder="Question Number *"
                  name="questionNumber"
                  value={formData.questionNumber}
                  onChange={handleInputChange}
                />
                {errorAlerts.questionNumber && (
                  <div className={styles2.alertBox}>
                    <p>{errorAlerts.questionNumber}</p>
                  </div>
                )}
              </div>

              <div className={styles2.inputDiv}>
                <input
                  type="text"
                  name="questionText"
                  placeholder="Question Text"
                  value={formData.questionText}
                  onChange={handleInputChange}
                />
                {errorAlerts.questionText && (
                  <div className={styles2.alertBox}>
                    <p>{errorAlerts.questionText}</p>
                  </div>
                )}
              </div>
              {/* <div className={styles.intputDiv}>
              
                <input
                  type="text"
                  placeholder="Answer Text"
                  name="answerText"
                  value={formData.answerText}
                  onChange={handleInputChange}
                />
              </div> */}

              <div className={styles2.inputDivInner}>
                <div className={styles2.inputDiv}>
                  <input
                    type="text"
                    name="writtenBy"
                    placeholder="Written By"
                    disabled={setWrittenByFieldDis}
                    value={formData.topperName}
                    onChange={handleInputChange}
                  />
                  {errorAlerts.writtenBy && (
                    <div className={styles2.alertBox}>
                      <p>{errorAlerts.writtenBy}</p>
                    </div>
                  )}
                  {writtenByFieldDis && (
                    <div
                      onClick={() => {
                        clearField("writtenBy");
                      }}
                    >
                      Clear
                    </div>
                  )}
                </div>

                {formData.topperName && !writtenByFieldDis && (
                  <div className={styles2.optionsContainer}>
                    {users
                      .slice(0, 5)
                      .filter((item) => {
                        return formData.topperName.toLowerCase() === ""
                          ? item
                          : item.firstname
                              .toLowerCase()
                              .includes(formData.topperName.toLowerCase());
                      })
                      .map((result) => (
                        <div
                          onClick={() => handleSelectForTopper(result)}
                          key={result._id}
                          className={styles2.option}
                        >
                          {result.firstname}
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* <div className={styles.intputDiv}>
                <div className={styles.labels}>paper</div>
                <div className={styles.inputDivInner}>
                  <div className={styles2.inputDiv}>
                    <input
                      ref={paperInputRef}
                      type="text"
                      name="paper"
                      disabled={paperFieldDis}
                      value={formData.paper}
                      onChange={handleInputChange}
                    />
                    {paperFieldDis && (
                      <div
                        onClick={() => {
                          clearField("paper");
                        }}
                      >
                        Clear
                      </div>
                    )}
                  </div>

                  {formData.paper && !paperFieldDis && (
                    <div className={styles2.optionsContainer}>
                      {searchResultsPaper
                        .slice(0, 5)
                        .filter((item) => {
                          return formData.paper.toLowerCase() === ""
                            ? item
                            : item.name
                                .toLowerCase()
                                .includes(formData.paper.toLowerCase());
                        })
                        .map((result) => (
                          <div
                            onClick={() => handleSelect("paper", result)}
                            key={result._id}
                            className={styles2.option}
                          >
                            {result.name}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div> */}
            </div>
            <div className={styles.separator}></div>
            <div className={styles2.secondHalf}>
              <div className={styles2.intputDivImage}>
                <h2>Upload Images</h2>
                <div className={styles2.imageInputDiv}>
                  <div className={styles2.imageDivFirst}>
                    {formData.answerImages &&
                      formData.answerImages.map((data, index) => {
                        if (data.name !== "") {
                          return (
                            <div
                              className={styles2.imageUploadedDiv}
                              key={index}
                            >
                              <p> {data.name}</p>
                              <div onClick={() => handleClearImage(data.name)}>
                                <Image
                                  src={close}
                                  fill
                                  alt="close"
                                  objectFit="contain"
                                  objectPosition="center"
                                ></Image>
                              </div>
                            </div>
                          );
                        } else {
                          return null;
                        }
                      })}
                    {ImageName.length === 0 && (
                      <div className={styles2.addImagePrompt}>
                        <h3>Just add an Image and we will handle the rest!</h3>
                        {/*  */}
                        {errorAlerts.image && <p>{errorAlerts.image} </p>}
                      </div>
                    )}
                  </div>
                  <div className={styles2.imageDivSecond}>
                    <input
                      type="file"
                      name="Image"
                      id="files"
                      style={{ display: "none" }}
                      accept="image/*"
                      multiple
                      placeholder="Image url"
                      onChange={handleImageUpload}
                    />

                    {
                      <div
                        className={styles2.imagePasteSec}
                        onPaste={handleImagePaste}
                        style={{
                          border: "1px dashed #ccc",
                          padding: "20px",
                          textAlign: "center",
                        }}
                      >
                        <p>Or paste an image using Ctrl+V</p>
                      </div>
                    }

                    <label className={styles2.uploadImagBtn} htmlFor="files">
                      <p>Upload</p>
                    </label>
                  </div>
                </div>
              </div>
              {/* <h4>Added Topics</h4>
              <div className={styles2.showSelectedtopic}>
                {topicArray.map((data, index) => {
                  return <>{data.name && <div key={index}>{data.name}</div>}</>;
                })}
              </div> */}
              {/* <div className={styles.intputDiv}>
                <div className={styles.labels}>topicName</div>

                <div className={styles.inputDivInner}>
                  <div className={styles2.inputDiv}>
                    <input
                      ref={topicInputRef}
                      type="text"
                      name="topicName"
                      value={formData.topicName}
                      onChange={handleInputChange}
                    />{" "}
                    <div onClick={addTopic}>Add</div>
                  </div>
                  {formData.topicName && (
                    <>
                      <div className={styles2.optionsContainer}>
                        {searchResultsTopic
                          .slice(0, 5)
                          .filter((item) => {
                            return formData.topicName.toLowerCase() === ""
                              ? item
                              : item.name
                                  .toLowerCase()
                                  .includes(formData.topicName.toLowerCase());
                          })
                          .map((result) => (
                            <div
                              onClick={() => handleSelect("topicName", result)}
                              key={result._id}
                              className={styles2.option}
                            >
                              {result.name}{" "}
                            </div>
                          ))}
                      </div>
                    </>
                  )}
                </div>
              </div> */}
              {/* <h4>Added sub Topics</h4>
              <div className={styles2.showSelectedtopic}>
                {subTopicArray.map((data, index) => {
                  return <>{data.name && <div key={index}>{data.name}</div>}</>;
                })}
              </div> */}
              {/* <div className={styles.intputDiv}>
                <div className={styles.labels}>subtopicName</div>

                <div className={styles.inputDivInner}>
                  <div className={styles2.inputDiv}>
                    <input
                      ref={subTopicInputRef}
                      type="text"
                      name="subtopicName"
                      value={formData.subtopicName}
                      onChange={handleInputChange}
                    />
                    <div onClick={addSubTopic}>Add</div>
                  </div>
                  {formData.subtopicName && (
                    <div className={styles2.optionsContainer}>
                      {searchResultsSubTopic

                        .filter((item) => {
                          return formData.subtopicName.toLowerCase() === ""
                            ? item
                            : item.name
                                .toLowerCase()
                                .includes(formData.subtopicName.toLowerCase());
                        })
                        .map((result) => (
                          <div
                            onClick={() => handleSelect("subtopicName", result)}
                            key={result._id}
                            className={styles2.option}
                          >
                            {result.name}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div> */}
            </div>
          </div>

          <div className={styles2.btnHolder}>
            <button
              type="submit"
              disabled={isLoading}
              className={styles2.submitQuestionForm}
            >
              {isLoading && <span>Adding...</span>}
              {!isLoading && <span>Add Answer </span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
export default AnswerForm;
