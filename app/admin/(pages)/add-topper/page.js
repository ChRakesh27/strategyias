"use client";
import { useRef } from "react";
import React from "react";
import styles from "../../(styles)/(form-style)/TopperForm.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

import axios from "axios";
import dynamic from "next/dynamic";
import Image from "next/image";
import close from "../(utils)/close.png";
import toast from "react-hot-toast";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const TopperForm = () => {
  var optionalSubjects = [
    "Agriculture",
    "Animal Husbandry and Veterinary Science",
    "Anthropology",
    "Botany",
    "Chemistry",
    "Civil Engineering",
    "Commerce & Accountancy",
    "Economics",
    "Electrical Engineering",
    "Geography",
    "Geology",
    "History",
    "Law",
    "Management",
    "Mathematics",
    "Mechanical Engineering",
    "Medical Science",
    "Philosophy",
    "Physics",
    "Political Science & International Relations",
    "Psychology",
    "Public Administration",
    "Sociology",
    "Statistics",
    "Zoology",
  ];

  const router = useRouter();
  const editor = useRef(null);
  const [showOptionalSubOptions, setShowOptionalSubOptions] = useState(false);
  const [ImageName, setImageName] = useState("");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    rank: "",
    year: "",
    gs1marks: "",
    gs2marks: "",
    gs3marks: "",
    gs4marks: "",
    essayMarks: "",
    prelimsScoreGs: "",
    prelimsScoreCsat: "",
    optionalSub: "",
    optional1Marks: "",
    optional2Marks: "",
    writtenMarks: "",
    interviewMarks: "",
    Remarks: "",
    profileImage: "",
    metaDescription: "",
  });

  const [errorAlerts, setErrorAlerts] = useState({
    firstname: "",
    lastname: "",

    rank: "",
    year: "",
    gs1marks: "",
    gs2marks: "",
    gs3marks: "",
    gs4marks: "",
    essayMarks: "",
    optionalSub: "",
    optional1Marks: "",
    optional2Marks: "",
    writtenMarks: "",
    interviewMarks: "",
    profileImage: "",
  });
  const conditionalWidth = formData.profileImage
    ? { width: "100%" }
    : { width: "50%" };
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e, type) => {
    if (e.target.name === "optionalSub") {
      setShowOptionalSubOptions(true);
    }

    setErrorAlerts((prevData) => ({
      ...prevData,

      firstname: "",
      lastname: "",
      rank: "",
      year: "",
      gs1marks: "",
      gs2marks: "",
      gs3marks: "",
      gs4marks: "",
      essayMarks: "",
      optionalSub: "",
      optional1Marks: "",
      optional2Marks: "",
      writtenMarks: "",
      interviewMarks: "",
      profileImage: "",
    }));
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOptionalSubClick = (data) => {
    setShowOptionalSubOptions(false);
    setFormData((prevData) => ({
      ...prevData,
      optionalSub: data,
    }));
  };

  const handleTextEditor = (name, content) => {
    if (name === "Remarks") {
      setFormData((prevData) => ({
        ...prevData,
        Remarks: content,
      }));
    }
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageName(file.name);

      setFormData((prevData) => ({
        ...prevData,
        profileImage: file,
      }));
      setErrorAlerts((prevData) => ({
        ...prevData,
        firstname: "",
        lastname: "",
        rank: "",
        year: "",
        gs1marks: "",
        gs2marks: "",
        gs3marks: "",
        gs4marks: "",
        essayMarks: "",
        optionalSub: "",
        optional1Marks: "",
        optional2Marks: "",
        writtenMarks: "",
        interviewMarks: "",
        profileImage: "",
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstname) {
      setErrorAlerts((prevData) => ({
        ...prevData,
        firstname: "Name is required",
      }));
      return;
    } else if (!formData.lastname) {
      setErrorAlerts((prevData) => ({
        ...prevData,
        lastname: "Name is required",
      }));
      return;
    } else if (!formData.rank) {
      setErrorAlerts((prevData) => ({
        ...prevData,
        rank: "Rank is required",
      }));
      return;
    } else if (!formData.year) {
      setErrorAlerts((prevData) => ({
        ...prevData,
        year: "Year is required",
      }));
      return;
    } else if (!formData.essayMarks) {
      setErrorAlerts((prevData) => ({
        ...prevData,
        essayMarks: "Essay Marks  is required",
      }));
      return;
    } else if (!formData.gs1marks) {
      setErrorAlerts((prevData) => ({
        ...prevData,
        gs1marks: "Gs 1 Marks  is required",
      }));
      return;
    } else if (!formData.gs2marks) {
      setErrorAlerts((prevData) => ({
        ...prevData,
        gs2marks: "Gs 2 Marks  is required",
      }));
      return;
    } else if (!formData.gs3marks) {
      setErrorAlerts((prevData) => ({
        ...prevData,
        gs3marks: "Gs 3 Marks  is required",
      }));
      return;
    } else if (!formData.gs4marks) {
      setErrorAlerts((prevData) => ({
        ...prevData,
        gs4marks: "Gs 4 Marks  is required",
      }));
      return;
    } else if (!formData.writtenMarks) {
      setErrorAlerts((prevData) => ({
        ...prevData,
        writtenMarks: "Written Marks  is required",
      }));
      return;
    } else if (!formData.interviewMarks) {
      setErrorAlerts((prevData) => ({
        ...prevData,
        interviewMarks: "Interview Marks  is required",
      }));
      return;
    } else if (!formData.optionalSub) {
      setErrorAlerts((prevData) => ({
        ...prevData,
        optionalSub: "Optional Subject  is required",
      }));
      return;
    } else if (!formData.optional1Marks) {
      setErrorAlerts((prevData) => ({
        ...prevData,
        optional1Marks: "Optional 1 marks  is required",
      }));
      return;
    } else if (!formData.optional2Marks) {
      setErrorAlerts((prevData) => ({
        ...prevData,
        optional2Marks: "Optional 2 marks  is required",
      }));
      return;
    } else if (!formData.profileImage) {
      setErrorAlerts((prevData) => ({
        ...prevData,
        profileImage: "Profile Images is required",
      }));
      return;
    }
    setIsLoading(true);

    const formdata = new FormData();
    formdata.append("firstname", formData.firstname);
    formdata.append("metaDescription", formData.metaDescription);
    formdata.append("lastname", formData.lastname);
    formdata.append("rank", formData.rank);
    formdata.append("year", formData.year);
    formdata.append("gs1marks", formData.gs1marks);
    formdata.append("gs2marks", formData.gs2marks);
    formdata.append("gs3marks", formData.gs3marks);
    formdata.append("gs4marks", formData.gs4marks);
    formdata.append("essayMarks", formData.essayMarks);
    formdata.append("prelimsScoreGs", formData.prelimsScoreGs);
    formdata.append("prelimsScoreCsat", formData.prelimsScoreCsat);
    formdata.append("optionalSub", formData.optionalSub);
    formdata.append("optional1Marks", formData.optional1Marks);
    formdata.append("optional2Marks", formData.optional2Marks);
    formdata.append("interviewMarks", formData.interviewMarks);
    formdata.append("writtenMarks", formData.writtenMarks);
    formdata.append("Remarks", formData.Remarks);
    formdata.append("profileImage", formData.profileImage);
    try {
      const res = await fetch("/api/admin/add-topper", {
        method: "POST",
        body: formdata,
      });

      if (res.status === 200) {
        setIsLoading(false);
        toast.success("Added the topper successfully.");
        setFormData((prevData) => ({
          ...prevData,
          firstname: "",
          lastname: "",
          rank: "",
          year: "",
          gs1marks: "",
          gs2marks: "",
          gs3marks: "",
          gs4marks: "",
          essayMarks: "",
          prelimsScoreGs: "",
          prelimsScoreCsat: "",
          optionalSub: "",
          optional1Marks: "",
          optional2Marks: "",
          writtenMarks: "",
          interviewMarks: "",
          Remarks: "",
          profileImage: "",
          metaDescription: "",
        }));
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      alert(error);
      setIsLoading(false);
    }
  };

  const handleImagePaste = async (e) => {
    if (e.clipboardData.items.length) {
      for (let i = 0; i < e.clipboardData.items.length; i++) {
        if (e.clipboardData.items[i].type.indexOf("image") !== -1) {
          const fileObject = e.clipboardData.items[i].getAsFile();

          if (fileObject) {
            setImageName(fileObject.name);

            if (fileObject) {
              setFormData((prevData) => ({
                ...prevData,
                profileImage: fileObject,
              }));
              setErrorAlerts((prevData) => ({
                ...prevData,
                name: "",
                rank: "",
                year: "",
                gs1marks: "",
                gs2marks: "",
                gs3marks: "",
                gs4marks: "",
                essayMarks: "",
                optionalSub: "",
                optional1Marks: "",
                optional2Marks: "",
                writtenMarks: "",
                interviewMarks: "",
                profileImage: "",
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
  const handleClear = (e) => {
    e.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      profileImage: "",
    }));
  };
  return (
    <div className={styles.all}>
      <div className={styles.questionFormContainer}>
        <form onSubmit={handleSubmit} className={styles.questionForm} action="">
          <div className={styles.formHeading}>
            <h1>
              Add <span>Topper</span>{" "}
            </h1>
          </div>

          <div className={styles.formInsideContainer}>
            <div className={styles.firstHalf}>
              <div className={styles.inputDiv}>
                <input
                  type="text"
                  name="firstname"
                  placeholder="First Name *"
                  value={formData.firstname}
                  onChange={handleInputChange}
                />
                {errorAlerts.firstname && (
                  <div className={styles.alertBox}>
                    {" "}
                    <p>{errorAlerts.firstname}</p>
                  </div>
                )}
              </div>
              <div className={styles.inputDiv}>
                <input
                  type="text"
                  name="lastname"
                  placeholder="Last Name *"
                  value={formData.lastname}
                  onChange={handleInputChange}
                />
                {errorAlerts.lastname && (
                  <div className={styles.alertBox}>
                    {" "}
                    <p>{errorAlerts.lastname}</p>
                  </div>
                )}
              </div>
              <div className={styles.inputDiv}>
                <input
                  type="number"
                  placeholder="Topper Rank *"
                  name="rank"
                  value={formData.rank}
                  onChange={handleInputChange}
                />
                {errorAlerts.rank && (
                  <div className={styles.alertBox}>
                    {" "}
                    <p>{errorAlerts.rank}</p>
                  </div>
                )}
              </div>

              <div className={styles.inputDiv}>
                <input
                  type="number"
                  placeholder="Year *"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                />
                {errorAlerts.year && (
                  <div className={styles.alertBox}>
                    {" "}
                    <p>{errorAlerts.year}</p>
                  </div>
                )}
              </div>
              <div className={styles.inputDiv}>
                <input
                  type="number"
                  name="essayMarks"
                  placeholder="Essay Marks *"
                  value={formData.essayMarks}
                  onChange={handleInputChange}
                />
                {errorAlerts.essayMarks && (
                  <div className={styles.alertBox}>
                    {" "}
                    <p>{errorAlerts.essayMarks}</p>
                  </div>
                )}
              </div>
              <div className={styles.inputDiv}>
                <input
                  type="number"
                  name="gs1marks"
                  placeholder="Gs 1 Marks *"
                  value={formData.gs1marks}
                  onChange={handleInputChange}
                />
                {errorAlerts.gs1marks && (
                  <div className={styles.alertBox}>
                    {" "}
                    <p>{errorAlerts.gs1marks}</p>
                  </div>
                )}
              </div>
              <div className={styles.inputDiv}>
                <input
                  type="number"
                  name="gs2marks"
                  placeholder="Gs 2 Marks *"
                  value={formData.gs2marks}
                  onChange={handleInputChange}
                />
                {errorAlerts.gs2marks && (
                  <div className={styles.alertBox}>
                    {" "}
                    <p>{errorAlerts.gs2marks}</p>
                  </div>
                )}
              </div>
              <div className={styles.inputDiv}>
                <input
                  type="number"
                  name="gs3marks"
                  placeholder="Gs 3 Marks *"
                  value={formData.gs3marks}
                  onChange={handleInputChange}
                />
                {errorAlerts.gs3marks && (
                  <div className={styles.alertBox}>
                    {" "}
                    <p>{errorAlerts.gs3marks}</p>
                  </div>
                )}
              </div>
              <div className={styles.inputDiv}>
                <input
                  type="number"
                  name="gs4marks"
                  placeholder="Gs 4 Marks *"
                  value={formData.gs4marks}
                  onChange={handleInputChange}
                />
                {errorAlerts.gs4marks && (
                  <div className={styles.alertBox}>
                    {" "}
                    <p>{errorAlerts.gs4marks}</p>
                  </div>
                )}
              </div>
              <div className={styles.inputDiv}>
                <input
                  type="Number"
                  name="writtenMarks"
                  placeholder="Written Marks *"
                  value={formData.writtenMarks}
                  onChange={handleInputChange}
                />
                {errorAlerts.writtenMarks && (
                  <div className={styles.alertBox}>
                    {" "}
                    <p>{errorAlerts.writtenMarks}</p>
                  </div>
                )}
              </div>
              <div className={styles.inputDiv}>
                <textarea
                  type="Number"
                  name="metaDescription"
                  placeholder="Meta Description"
                  value={formData.metaDescription}
                  onChange={handleInputChange}
                />
                {errorAlerts.writtenMarks && (
                  <div className={styles.alertBox}>
                    {" "}
                    <p>{errorAlerts.writtenMarks}</p>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.separator}></div>
            <div className={styles.secondHalf}>
              <div className={styles.inputDiv}>
                <input
                  type="Number"
                  name="interviewMarks"
                  placeholder="Interview Marks *"
                  value={formData.interviewMarks}
                  onChange={handleInputChange}
                />
                {errorAlerts.interviewMarks && (
                  <div className={styles.alertBox}>
                    {" "}
                    <p>{errorAlerts.interviewMarks}</p>
                  </div>
                )}
              </div>
              <div className={styles.inputDiv}>
                <input
                  type="number"
                  placeholder="Prelims score gs"
                  name="prelimsScoreGs"
                  value={formData.prelimsScoreGs}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.inputDiv}>
                <input
                  type="number"
                  name="prelimsScoreCsat"
                  placeholder="Prelims score csat"
                  value={formData.prelimsScoreCsat}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.inputDiv}>
                <div className={styles.optionalInputDiv}>
                  <input
                    type="text"
                    placeholder="Optional Subject *"
                    name="optionalSub"
                    value={formData.optionalSub}
                    onChange={handleInputChange}
                  />
                  {showOptionalSubOptions && (
                    <div className={styles.optionalSubOptions}>
                      {optionalSubjects
                        .filter((data) =>
                          data
                            .toLowerCase()
                            .includes(formData.optionalSub.toLowerCase())
                        )
                        .map((data, index) => {
                          return (
                            <div
                              onClick={() => {
                                handleOptionalSubClick(data);
                              }}
                              key={index}
                            >
                              {data}
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
                {errorAlerts.optionalSub && (
                  <div className={styles.alertBox}>
                    {" "}
                    <p>{errorAlerts.optionalSub}</p>
                  </div>
                )}
              </div>
              <div className={styles.inputDiv}>
                <input
                  type="number"
                  placeholder="Optional 1 marks *"
                  name="optional1Marks"
                  value={formData.optional1Marks}
                  onChange={handleInputChange}
                />
                {errorAlerts.optional1Marks && (
                  <div className={styles.alertBox}>
                    {" "}
                    <p>{errorAlerts.optional1Marks}</p>
                  </div>
                )}
              </div>
              <div className={styles.inputDiv}>
                <input
                  type="number"
                  placeholder="Optional 2 marks *"
                  name="optional2Marks"
                  value={formData.optional2Marks}
                  onChange={handleInputChange}
                />
                {errorAlerts.optional2Marks && (
                  <div className={styles.alertBox}>
                    {" "}
                    <p>{errorAlerts.optional2Marks}</p>
                  </div>
                )}
              </div>
              <div className={styles.inputDiv}>
                <div className={styles.editor}>
                  <JoditEditor
                    ref={editor}
                    //   value={content}
                    tabIndex={1}
                    onBlur={(newContent) =>
                      handleTextEditor("Remarks", newContent)
                    }
                    onChange={(newContent) => {}}
                  />
                </div>
              </div>
              <div className={styles.imageInputDiv}>
                <div style={conditionalWidth} className={styles.imageDivFirst}>
                  <div className={styles.labels}>Profile Image</div>

                  <div className={styles.addImagePrompt}>
                    <h3>Just add an Image and we will handle the rest!</h3>
                    {/*  */}

                    {errorAlerts.profileImage && (
                      <p>{errorAlerts.profileImage} </p>
                    )}
                  </div>

                  {formData.profileImage && (
                    <div className={styles.imageUploadedDiv}>
                      <p> {ImageName}</p>
                      <div onClick={(e) => handleClear(e)}>
                        <Image
                          src={close}
                          fill
                          alt="close"
                          objectFit="contain"
                          objectPosition="center"
                        ></Image>
                      </div>
                    </div>
                  )}
                </div>
                {!formData.profileImage && (
                  <div className={styles.imageDivSecond}>
                    {!formData.profileImage && (
                      <div
                        onPaste={handleImagePaste}
                        style={{
                          border: "2px dashed #ccc",
                          padding: "20px",
                          textAlign: "center",
                        }}
                      >
                        <p>Or paste an image using Ctrl+V</p>
                      </div>
                    )}
                    {!formData.profileImage && (
                      <input
                        type="file"
                        id="files"
                        style={{ display: "none" }}
                        name="profileImage"
                        accept="image/*"
                        placeholder="Image url"
                        onChange={handleImageUpload}
                      />
                    )}
                    {!formData.profileImage && (
                      <label className={styles.uploadImagBtn} htmlFor="files">
                        <p>Upload</p>
                      </label>
                    )}
                  </div>
                )}
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
              {!isLoading && <span>Add Topper </span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TopperForm;
