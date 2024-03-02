"use client";

import { useEffect, useRef } from "react";
import React from "react";
import close from "../(utils)/close.png";
import styles from "../../(styles)/(form-style)/pyqs.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
const CurrentAffairsForm = () => {
  const router = useRouter();
  const editor = useRef(null);
  const editor2 = useRef(null);
  const [subjects, setSubjects] = useState("");
  const [topics, setTopics] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [showtopicOptions, setShowtopicOptions] = useState(false);
  const [showSubOptions, setShowSubOptions] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    topicName: "",
    subjectName: "",
    subjectId: "",
    topicId: "",
    content: "",
    subTopics: "",
    faqTitle: "",
    faqContent: "",
    tags: "",
    faqs: [],
  });
  useEffect(() => {
    if (editor.current) {
      console.log(editor.current);
    }
  }, [editor]);
  const [errorAlerts, setErrorAlerts] = useState({
    title: "",
    slug: "",
    topicName: "",
    subjectName: "",
    subjectId: "",
    topicId: "",
    content: "",
    subTopics: "",
    tags: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const handleTextEditor = (name, text) => {
    if (name === "content") {
      setFormData((prevData) => ({
        ...prevData,
        content: text,
      }));
    } else if (name === "faqContent") {
      setFormData((prevData) => ({
        ...prevData,
        faqContent: text,
      }));
    }
  };
  const subjectInputRef = useRef(null);
  const topicInputRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        subjectInputRef.current &&
        !subjectInputRef.current.contains(event.target) &&
        topicInputRef.current &&
        !topicInputRef.current.contains(event.target)
      ) {
        setShowSubOptions(false);
        setShowtopicOptions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e, type) => {
    if (e.target.name === "subjectName") {
      setShowSubOptions(true);
    } else if (e.target.name === "topicName") {
      setShowtopicOptions(true);
    }

    setErrorAlerts((prevData) => ({
      ...prevData,
      title: "",
      slug: "",

      content: "",
      subTopics: "",
      tags: "",
    }));
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const removeFaq = (index) => {
    const updatedFaqs = [...formData.faqs];
    updatedFaqs.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      faqs: updatedFaqs,
    }));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/admin/getSubjects");
        setSubjects(response.data.subjects);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleSubjectSelect = async (data) => {
    setShowSubOptions(false);
    setFormData((prevData) => ({
      ...prevData,
      subjectId: data._id,
      subjectName: data.name,
    }));

    try {
      const body = { subjectId: data._id };
      const response = await axios.post("/api/admin/getTopics", body);

      const topics = await response.data.topics;
      setTopics(topics);

    } catch (err) {
      console.log(err);
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const prelimsNotes = {
      title: formData.title,
      faqs: formData.faqs,
      slug: formData.slug,
      topicName: formData.topicName,
      subjectName: formData.subjectName,
      subjectId: formData.subjectId,
      topicId: formData.topicId,
      content: formData.content,
      subTopics: formData.subTopics,
      tags: formData.tags,
    };

    try {
      const res = await fetch("/api/admin/update-prelims-notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prelimsNotes),
      });

      if (res.status === 200) {
        setIsLoading(false);
        setEditMode(false);
        toast.success("updated prelims notes");
        setFormData((prevData) => ({
          ...prevData,
          title: "",
          slug: "",
          topicName: "",
          subjectName: "",
          subjectId: "",
          topicId: "",
          content: "",
          subTopics: "",
          faqTitle: "",
          faqContent: "",
          tags: "",
          faqs: [],
        }));

        router.push("/admin/add-prelims-notes");
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      alert(error);
      setIsLoading(false);
    }
  };

  const handleCancleBtn = () => {
    setEditMode(false);
    setFormData((prevData) => ({
      ...prevData,
      title: "",
      slug: "",
      topicName: "",
      subjectName: "",
      subjectId: "",
      topicId: "",
      content: "",
      subTopics: "",
      faqTitle: "",
      faqContent: "",
      tags: "",
      faqs: [],
    }));
  };

  const addFaq = () => {
    if (formData.faqTitle && formData.faqContent) {
      const newFaq = {
        title: formData.faqTitle,
        solution: formData.faqContent,
      };
      setFormData((prevData) => ({
        ...prevData,
        faqs: [...prevData.faqs, newFaq],
      }));
    } else {
      alert("please provide both the fields for faqs");
    }
  };
  const handleTopicSelect = async (data) => {
    setShowtopicOptions(false);

    const body = { subject: formData.subjectId, topic: data._id };
    const response = await axios.post("/api/admin/get-prelims-notes", body);

    if (editor.current) {
      editor.current.value = response.data.note[0].content;
    }
    setEditMode(true);
    setFormData((prevData) => ({
      ...prevData,
      topicId: data._id,
      title: response.data.note[0].title,
      content: response.data.note[0].content,
      slug: response.data.note[0].slug,
      subTopics: response.data.note[0].subTopics,
      tags: response.data.note[0].tags,
      faqs: response.data.note[0].faqs,
      topicName: data.name,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!formData.question) {
    //   setErrorAlerts((prevData) => ({
    //     ...prevData,
    //     question: "question is required",
    //   }));
    //   return;
    // } else if (!formData.option1) {
    //   setErrorAlerts((prevData) => ({
    //     ...prevData,
    //     option1: "option 1 is required",
    //   }));
    //   return;
    // } else if (!formData.option2) {
    //   setErrorAlerts((prevData) => ({
    //     ...prevData,
    //     option2: "option 2 is required",
    //   }));
    //   return;
    // } else if (!formData.option3) {
    //   setErrorAlerts((prevData) => ({
    //     ...prevData,
    //     option3: "option 3 is required",
    //   }));
    //   return;
    // } else if (!formData.option4) {
    //   setErrorAlerts((prevData) => ({
    //     ...prevData,
    //     option4: "option 4 is required",
    //   }));
    //   return;
    // } else if (!formData.solution) {
    //   setErrorAlerts((prevData) => ({
    //     ...prevData,
    //     solution: "solution  is required",
    //   }));
    //   return;
    // } else if (!formData.correctOption) {
    //   setErrorAlerts((prevData) => ({
    //     ...prevData,
    //     correctOption: "correct Option  is required",
    //   }));
    //   return;
    // }

    setIsLoading(true);

    const prelimsNotes = {
      title: formData.title,
      faq: formData.faqs,
      slug: formData.slug,
      topicName: formData.topicName,
      subjectName: formData.subjectName,
      subjectId: formData.subjectId,
      topicId: formData.topicId,
      content: formData.content,
      subTopics: formData.subTopics,
      tags: formData.tags,
    };

    try {
      const res = await fetch("/api/admin/add-prelims-notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prelimsNotes),
      });

      if (res.status === 200) {
        setIsLoading(false);
        toast.success("saved prelims notes");
        setFormData((prevData) => ({
          ...prevData,
          title: "",
          slug: "",
          topicName: "",
          subjectName: "",
          subjectId: "",
          topicId: "",
          content: "",
          subTopics: "",
          faqTitle: "",
          faqContent: "",
          tags: "",
          faqs: [],
        }));

        router.push("/admin/add-prelims-notes");
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
              Add <span>Prelims notes</span>{" "}
            </h1>
          </div>

          <div className={styles.formInsideContainer}>
            <div className={styles.firstHalf}>
              <div className={styles.inputDiv}>
                <input
                  type="text"
                  placeholder="title *"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
                {/* {errorAlerts.option1 && (
                  <div className={styles.alertBox}>
                    {" "}
                    <p>{errorAlerts.option1}</p>
                  </div>
                )} */}
              </div>
              <div className={styles.inputDiv}>
                <h2>Content:</h2>
                {/* {errorAlerts.question && (
                  <div className={styles.alertBox}>
                    {" "}
                    <p>{errorAlerts.question}</p>
                  </div>
                )} */}

                <JoditEditor
                  ref={editor}
                  value={formData.content}
                  tabIndex={1}
                  onBlur={(newContent) =>
                    handleTextEditor("content", newContent)
                  }
                  onChange={(newContent) => { }}
                />
              </div>

              <div className={styles.inputDiv}>
                <input
                  type="text"
                  placeholder="slug *"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                />
                {/* {errorAlerts.option2 && (
                  <div className={styles.alertBox}>
                    {" "}
                    <p>{errorAlerts.option2}</p>
                  </div>
                )} */}
              </div>
              <div className={styles.inputDivSubject}>
                <input
                  type="text"
                  name="subjectName"
                  placeholder="subject *"
                  value={formData.subjectName}
                  onChange={handleInputChange}
                  required
                />

                {showSubOptions && formData.subjectName && (
                  <div
                    ref={subjectInputRef}
                    className={styles.subjectOptionsDiv}
                  >
                    {subjects
                      .filter((data) =>
                        data.name
                          .toLowerCase()
                          .includes(formData.subjectName.toLowerCase())
                      )
                      .map((data, index) => {
                        return (
                          <div
                            onClick={(e) => {
                              handleSubjectSelect(data);
                            }}
                            className={styles.subjectOptions}
                            key={index}
                          >
                            {data.name}
                          </div>
                        );
                      })}
                  </div>
                )}

                {/* {errorAlerts.option3 && (
                  <div className={styles.alertBox}>
                    {" "}
                    <p>{errorAlerts.option3}</p>
                  </div>
                )} */}
              </div>
              <div className={styles.inputDivSubject}>
                <input
                  type="text"
                  name="topicName"
                  placeholder="topic *"
                  value={formData.topicName}
                  onChange={handleInputChange}
                  required
                />

                {showtopicOptions && formData.topicName && (
                  <div ref={topicInputRef} className={styles.subjectOptionsDiv}>
                    {topics
                      .filter((data) =>
                        data.name
                          .toLowerCase()
                          .includes(formData.topicName.toLowerCase())
                      )
                      .map((data, index) => {
                        return (
                          <div
                            onClick={(e) => {
                              handleTopicSelect(data);
                            }}
                            className={styles.subjectOptions}
                            key={index}
                          >
                            {data.name}
                          </div>
                        );
                      })}
                  </div>
                )}

                {/* {errorAlerts.option3 && (
                  <div className={styles.alertBox}>
                    {" "}
                    <p>{errorAlerts.option3}</p>
                  </div>
                )} */}
              </div>

              <div className={styles.inputDiv}>
                <input
                  type="text"
                  name="subTopics"
                  placeholder="sub topics *"
                  value={formData.subTopics}
                  onChange={handleInputChange}
                />
                {/* {errorAlerts.option4 && (
                  <div className={styles.alertBox}>
                    {" "}
                    <p>{errorAlerts.option4}</p>
                  </div>
                )} */}
              </div>
              <div className={styles.inputDiv}>
                <input
                  type="text"
                  name="tags"
                  placeholder="tags *"
                  value={formData.tags}
                  onChange={handleInputChange}
                />
                {/* {errorAlerts.option4 && (
                  <div className={styles.alertBox}>
                    {" "}
                    <p>{errorAlerts.option4}</p>
                  </div>
                )} */}
              </div>

              {/* faq questions  */}

              <h1>Add FAQ </h1>

              <div className={styles.faqShowingContainer}>
                {formData.faqs?.map((data, index) => {
                  return (
                    <div className={styles.addedFaq} key={index}>
                      <div className={styles.addedFaqDetails}>
                        {index + 1}. <p>{data.title}</p>
                      </div>

                      <div
                        // onClick={() =>
                        //   handleLinkRemove("optional1Links", index)
                        // }
                        onClick={() => removeFaq(index)}
                        className={styles.closeBtnDiv}
                      >
                        X
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className={styles.faqQuestionsContainer}>
                <input
                  type="text"
                  placeholder="title"
                  name="faqTitle"
                  className={styles.faqinput}
                  onChange={handleInputChange}
                />
                <div className={styles.inputDiv}>
                  <h2>Solution:</h2>

                  <JoditEditor
                    ref={editor2}
                    //   value={content}
                    tabIndex={1}
                    onBlur={(newContent) =>
                      handleTextEditor("faqContent", newContent)
                    }
                    onChange={(newContent) => { }}
                  />
                </div>
              </div>
              <div onClick={(e) => addFaq()} className={styles.addFaqBtn}>
                Add FAQ
              </div>
            </div>
          </div>

          <div className={styles.btnHolder}>
            {isLoading && <span>Adding...</span>}
            {!isLoading && !editMode &&
              <button button type="submit" disabled={isLoading} className={styles.submitQuestionForm}>
                Add Notes
              </button>
            }
            {!isLoading && editMode &&
              <>
                <div onClick={handleCancleBtn} className={styles.cancleBtn}>
                  Cancle
                </div>
                <div
                  onClick={(e) => handleSaveChanges(e)}
                  className={styles.saveBtn}
                >
                  Save
                </div>
              </>
            }
          </div>
        </form>
      </div >
    </div >
  );
};

export default CurrentAffairsForm;
