"use client";

import { useState } from "react";
import styles from "../../(styles)/(form-style)/pyqs.module.css";

import { useEffect } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import Link from "next/link";

const DeleteArticlePage = () => {
  const [viewTab, setViewTab] = useState("");
  const [subjectList, setSubjectList] = useState();
  const [topicList, setTopicList] = useState([]);
  const [subjectId, setSubjectId] = useState();
  const [topicId, setTopicId] = useState();
  const [noteList, setNoteList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/admin/getSubjects?from=article");
        setSubjectList(response.data.subjects);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const selectSubject = async (e, fetchTopic) => {
    setSubjectId(e.target.value);
    if (fetchTopic) {
      try {
        const response = await axios.post("/api/admin/getTopics", {
          subjectId: e.target.value,
        });
        setTopicList(response.data.topics);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const selectTopic = (e) => {
    setTopicId(e.target.value);
  };

  const selectNote = async (e) => {
    try {
      const response = await axios.post("/api/admin/get-article", {
        subject: e.target.value,
      });
      setNoteList(response.data.note);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const deleteSubject = async () => {
    if (subjectId) {
      try {
        const body = subjectList.find((item) => item._id == subjectId);
        const response = await axios.post(
          "/api/admin/delete-article-subject",
          body
        );
        setSubjectId("");
        toast.success("deleted Successfully");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  const deleteTopic = async () => {
    if (subjectId && topicId) {
      try {
        const delSub = subjectList.find((item) => item._id == subjectId);
        const response = await axios.post("/api/admin/delete-article-topic", {
          delSub,
          topicId,
        });
        setTopicId("");
        toast.success("deleted Successfully");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  const deleteNote = async (data) => {
    try {
      const response = await axios.post("/api/admin/delete-article", data);
      setTopicId("");
      toast.success("deleted Successfully");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className={styles.all}>
        <div className={styles.questionFormContainer}>
          <div>
            <button
              type="button"
              className={
                viewTab === "subject"
                  ? styles.btnPrimary
                  : styles.outlineBtnPrimary
              }
              onClick={() => {
                setViewTab("subject");
              }}
            >
              Subject
            </button>
            <button
              type="button"
              className={
                viewTab === "topic"
                  ? styles.btnPrimary
                  : styles.outlineBtnPrimary
              }
              onClick={() => {
                setViewTab("topic");
              }}
            >
              Topic
            </button>
            <button
              type="button"
              className={
                viewTab === "note"
                  ? styles.btnPrimary
                  : styles.outlineBtnPrimary
              }
              onClick={() => {
                setViewTab("note");
              }}
            >
              Note
            </button>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <div>
            {viewTab === "subject" && (
              <>
                <div className={styles.formLabel}>Subject</div>
                <select
                  defaultValue={"none"}
                  className={styles.formSelect}
                  onChange={(e) => {
                    selectSubject(e, false);
                  }}
                >
                  <option value="none" disabled>
                    Select Subject
                  </option>
                  {subjectList.map((item, index) => (
                    <option value={item._id} key={index}>
                      {" "}
                      {item.name}
                    </option>
                  ))}
                </select>
                <br />
                <br />
                <button
                  type="button"
                  className={styles.outlineBtnDanger}
                  onClick={deleteSubject}
                >
                  Delete
                </button>
              </>
            )}
            {viewTab === "topic" && (
              <>
                <div className={styles.formLabel}>Subject</div>
                <select
                  className={styles.formSelect}
                  defaultValue={"none"}
                  onChange={(e) => {
                    selectSubject(e, true);
                  }}
                >
                  <option value="none" disabled>
                    Select Subject
                  </option>
                  {subjectList.map((item, index) => (
                    <option value={item._id} key={index}>
                      {" "}
                      {item.name}
                    </option>
                  ))}
                </select>
                <br />
                <br />
                <div className={styles.formLabel}>Topic</div>
                <select
                  className={styles.formSelect}
                  defaultValue={"none"}
                  onChange={selectTopic}
                >
                  <option value="none" disabled>
                    Select Topic
                  </option>
                  {topicList.map((item, index) => (
                    <option value={item._id} key={index}>
                      {" "}
                      {item.name}
                    </option>
                  ))}
                </select>
                <br />
                <br />
                <button
                  type="button"
                  className={styles.outlineBtnDanger}
                  onClick={deleteTopic}
                >
                  Delete
                </button>
              </>
            )}
            {viewTab === "note" && (
              <>
                <div className={styles.formLabel}>Subject</div>
                <select
                  className={styles.formSelect}
                  defaultValue={"none"}
                  onChange={selectNote}
                >
                  <option value="none" disabled>
                    Select Subject
                  </option>
                  {subjectList.map((item, index) => (
                    <option value={item._id} key={index}>
                      {" "}
                      {item.name}
                    </option>
                  ))}
                </select>
                <br />
                <br />
                <table>
                  <tbody>
                    <tr>
                      <th>S.No</th>
                      <th>Notes</th>
                      <th>Delete</th>
                    </tr>
                    {noteList.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <Link
                            href={"/prelims-notes/" + item.slug}
                            target="_blank"
                          >
                            {item.slug}
                          </Link>
                        </td>
                        <td>
                          <button
                            type="button"
                            className={styles.outlineBtnDanger}
                            onClick={() => deleteNote(item)}
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteArticlePage;
