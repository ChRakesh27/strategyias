"use client";
import React from "react";
import styles2 from "../../(styles)/(form-style)/answer-links-form.module.css";
import close from "../(utils)/close.png";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
const isValidUrl = (urlString) => {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator
  return !!urlPattern.test(urlString);
};
const AnswersLinksForm = () => {
  const router = useRouter();
  const [alreadyAdded, setAlreadyAdded] = useState({
    essayLinks: [],
    gs1Links: [],
    gs2Links: [],
    gs3Links: [],
    gs4Links: [],
    optional1Links: [],
    optional2Links: [],
  });
  const [formData, setFormData] = useState({
    essayLinks: [],
    gs1Links: [],
    gs2Links: [],
    gs3Links: [],
    gs4Links: [],
    optional1Links: [],
    optional2Links: [],
    essayLink: "",
    gs1Link: "",
    gs2Link: "",
    gs3Link: "",
    gs4Link: "",
    optional1Link: "",
    optional2Link: "",
    topperName: "",
    writtenBy: "", //Id for the topper
  });
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorAlerts, setErrorAlerts] = useState({
    writtenBy: "",
  });
  const [writtenByFieldDis, setWrittenByFieldDis] = useState(false);
  const handleInputChange = (e) => {
    if (
      (e.target.name === "essayLink" ||
        e.target.name === "gs1Link" ||
        e.target.name === "gs2Link" ||
        e.target.name === "gs3Link" ||
        e.target.name === "gs4Link" ||
        e.target.name === "optional1Link" ||
        e.target.name === "optional1Link") &&
      formData.writtenBy === ""
    ) {
      setErrorAlerts((prevData) => ({
        ...prevData,
        writtenBy: "First fill written by and select a topper.",
      }));
      return;
    }
    setErrorAlerts((prevData) => ({
      ...prevData,

      writtenBy: "",
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
  const handleSelectForTopper = async (result) => {

    setFormData((prevData) => ({
      ...prevData,
      topperName: result.firstname + " " + result.lastname,
      writtenBy: result._id,
      essayLinks: result.essayLinks,
      gs1Links: result.gs1Links,
      gs2Links: result.gs2Links,
      gs3Links: result.gs3Links,
      gs4Links: result.gs4Links,
      optional1Links: result.optional1Links || [],
      optional2Links: result.optional2Links || [],
    }));
    setAlreadyAdded((prevData) => ({
      ...prevData,

      essayLinks: result.essayLinks,
      gs1Links: result.gs1Links,
      gs2Links: result.gs2Links,
      gs3Links: result.gs3Links,
      gs4Links: result.gs4Links,
      optional1Links: result.optional1Links || [],
      optional2Links: result.optional2Links || [],
    }));
    setWrittenByFieldDis(true);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/getTopper");

        setUsers(response.data.toppers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  const clearField = (fieldName) => {
    if (fieldName === "writtenBy") {
      setWrittenByFieldDis(false);
      setFormData((prevData) => ({
        ...prevData,
        topperName: "",
        writtenBy: "",
        essayLinks: [],
        gs1Links: [],
        gs2Links: [],
        gs3Links: [],
        gs4Links: [],
        optional1Links: [],
        optional2Links: [],
        essayLink: "",
        gs1Link: "",
        gs2Link: "",
        gs3Link: "",
        gs4Link: "",
        optional1Link: "",
        optional2Link: "",
      }));
    }
  };

  const handleLinkAdd = (name) => {
    const propertyName = name.endsWith("s") ? name.slice(0, -1) : name;
    const linkValue = formData[propertyName];
    if (formData[propertyName] === "") {
      alert(`The ${linkValue} link is not a link.`);
      return;
    }
    if (!isValidUrl(linkValue)) {
      alert(`The ${linkValue} link is not a valid link.`);
      return;
    }
    if (formData[name].includes(linkValue)) {
      alert(`The ${linkValue} link is already added.`);
      return;
    }
    if (alreadyAdded[name].includes(linkValue)) {
      alert(`The ${linkValue} link is already added.`);
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [propertyName]: "",
      [name]: [...prevData[name], formData[propertyName]],
    }));
  };

  const handleLinkRemove = (name, index) => {
    setFormData((prevData) => {
      const updatedLinks = [...prevData[name]];
      updatedLinks.splice(index, 1);

      return {
        ...prevData,
        [name]: updatedLinks,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.writtenBy) {
      setErrorAlerts((prevData) => ({
        ...prevData,
        writtenBy: "writtenBy is required",
      }));
      return;
    }
    setIsLoading(true);
    const links = {
      writtenBy: formData.writtenBy,
      essayLinks: formData.essayLinks,
      gs1Links: formData.gs1Links,
      gs2Links: formData.gs2Links,
      gs3Links: formData.gs3Links,
      gs4Links: formData.gs4Links,
      optional1Links: formData.optional1Links,
      optional2Links: formData.optional2Links,
    };

    try {
      const res = await fetch("/api/admin/add-links", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(links),
      });

      if (res.status === 200) {
        setIsLoading(false);
        toast.success("Added links successfully");
        clearField("writtenBy");
      } else {
        const data = await res.json();
        alert(
          "An error occurred. Please try again. Error message: " + data.message
        );
        toast.error("Error occured ");
        setIsLoading(false);
      }
    } catch (error) {
      alert(error);
      setIsLoading(false);
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
              Add <span>Links</span>{" "}
            </h1>
          </div>

          <div className={styles2.formInsideContainer}>
            <div className={styles2.firstHalf}>
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
                      .filter((item) => {
                        const searchTerm = formData.topperName.toLowerCase();
                        if (searchTerm === "") {
                          return true;
                        }

                        const searchWords = searchTerm.split(" ");
                        return searchWords.every(
                          (word) =>
                            item.firstname.toLowerCase().includes(word) ||
                            item.lastname.toLowerCase().includes(word)
                        );
                      })
                      .map((result) => (
                        <div
                          onClick={() => handleSelectForTopper(result)}
                          key={result._id}
                          className={styles2.option}
                        >
                          {result.firstname} {result.lastname}
                        </div>
                      ))}
                  </div>
                )}

                <div className={styles2.inputDiv}>
                  <input
                    type="text"
                    name="essayLink"
                    placeholder="Add Essay Link"
                    value={formData.essayLink}
                    onChange={handleInputChange}
                  />
                  {errorAlerts.essayLinks && (
                    <div className={styles2.alertBox}>
                      <p>{errorAlerts.essayLinks}</p>
                    </div>
                  )}
                  <div
                    onClick={() => {
                      handleLinkAdd("essayLinks");
                    }}
                  >
                    Add
                  </div>
                </div>

                <div className={styles2.inputDiv}>
                  <input
                    type="text"
                    name="gs1Link"
                    placeholder="Add Gs1 Link"
                    value={formData.gs1Link}
                    onChange={handleInputChange}
                  />
                  {errorAlerts.essayLinks && (
                    <div className={styles2.alertBox}>
                      <p>{errorAlerts.essayLinks}</p>
                    </div>
                  )}
                  <div
                    onClick={() => {
                      handleLinkAdd("gs1Links");
                    }}
                  >
                    Add
                  </div>
                </div>
                <div className={styles2.inputDiv}>
                  <input
                    type="text"
                    name="gs2Link"
                    placeholder="Add Gs2 Link"
                    value={formData.gs2Link}
                    onChange={handleInputChange}
                  />
                  {errorAlerts.essayLinks && (
                    <div className={styles2.alertBox}>
                      <p>{errorAlerts.essayLinks}</p>
                    </div>
                  )}
                  <div
                    onClick={() => {
                      handleLinkAdd("gs2Links");
                    }}
                  >
                    Add
                  </div>
                </div>
                <div className={styles2.inputDiv}>
                  <input
                    type="text"
                    name="gs3Link"
                    placeholder="Add Gs3 Link"
                    value={formData.gs3Link}
                    onChange={handleInputChange}
                  />
                  {errorAlerts.essayLinks && (
                    <div className={styles2.alertBox}>
                      <p>{errorAlerts.essayLinks}</p>
                    </div>
                  )}
                  <div
                    onClick={() => {
                      handleLinkAdd("gs3Links");
                    }}
                  >
                    Add
                  </div>
                </div>
                <div className={styles2.inputDiv}>
                  <input
                    type="text"
                    name="gs4Link"
                    placeholder="Add Gs4 Link"
                    value={formData.gs4Link}
                    onChange={handleInputChange}
                  />
                  {errorAlerts.essayLinks && (
                    <div className={styles2.alertBox}>
                      <p>{errorAlerts.essayLinks}</p>
                    </div>
                  )}
                  <div
                    onClick={() => {
                      handleLinkAdd("gs4Links");
                    }}
                  >
                    Add
                  </div>
                </div>
                <div className={styles2.inputDiv}>
                  <input
                    type="text"
                    name="optional1Link"
                    placeholder="Add optional 1 Link"
                    value={formData.optional1Link}
                    onChange={handleInputChange}
                  />
                  {errorAlerts.essayLinks && (
                    <div className={styles2.alertBox}>
                      <p>{errorAlerts.essayLinks}</p>
                    </div>
                  )}
                  <div
                    onClick={() => {
                      handleLinkAdd("optional1Links");
                    }}
                  >
                    Add
                  </div>
                </div>
                <div className={styles2.inputDiv}>
                  <input
                    type="text"
                    name="optional2Link"
                    placeholder="Add optional 2 Link"
                    value={formData.optional2Link}
                    onChange={handleInputChange}
                  />
                  {errorAlerts.essayLinks && (
                    <div className={styles2.alertBox}>
                      <p>{errorAlerts.essayLinks}</p>
                    </div>
                  )}
                  <div
                    onClick={() => {
                      handleLinkAdd("optional2Links");
                    }}
                  >
                    Add
                  </div>
                </div>
              </div>
            </div>
            <div className={styles2.separator}></div>
            <div className={styles2.secondHalf}>
              <div className={styles2.linksDivContainer}>
                <div
                  className={`${styles2.linksDiv} + ${styles2.borderRight} + ${styles2.borderBottom}`}
                >
                  <h3>Essay Links</h3>
                  <div className={styles2.links}>
                    {formData.essayLinks.map((data, index) => {
                      return (
                        <div key={index}>
                          <div
                            onClick={() =>
                              handleLinkRemove("essayLinks", index)
                            }
                            className={styles2.closeBtnDiv}
                          >
                            <Image
                              src={close}
                              fill
                              alt="close"
                              objectFit="contain"
                              objectPosition="center"
                              className={styles2.closeBtn}
                            ></Image>
                          </div>
                          <div className={styles2.linkTextContainer}>
                            <p>{data}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div
                  className={`${styles2.linksDiv} + ${styles2.borderBottom}`}
                >
                  <h3>Gs1 Links</h3>
                  <div className={`${styles2.links}`}>
                    {formData.gs1Links.map((data, index) => {
                      return (
                        <div key={index}>
                          <div
                            onClick={() => handleLinkRemove("gs1Links", index)}
                            className={styles2.closeBtnDiv}
                          >
                            <Image
                              src={close}
                              fill
                              alt="close"
                              objectFit="contain"
                              objectPosition="center"
                              className={styles2.closeBtn}
                            ></Image>
                          </div>
                          <div className={styles2.linkTextContainer}>
                            {" "}
                            <p>{data}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div
                  className={`${styles2.linksDiv} + ${styles2.borderRight} + ${styles2.borderBottom}`}
                >
                  <h3>Gs2 Links</h3>
                  <div className={`${styles2.links}`}>
                    {formData.gs2Links.map((data, index) => {
                      return (
                        <div key={index}>
                          <div
                            onClick={() => handleLinkRemove("gs2Links", index)}
                            className={styles2.closeBtnDiv}
                          >
                            <Image
                              src={close}
                              fill
                              alt="close"
                              objectFit="contain"
                              objectPosition="center"
                              className={styles2.closeBtn}
                            ></Image>
                          </div>
                          <div className={styles2.linkTextContainer}>
                            {" "}
                            <p>{data}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div
                  className={`${styles2.linksDiv} + ${styles2.borderBottom}`}
                >
                  <h3>Gs3 Links</h3>
                  <div className={`${styles2.links}`}>
                    {formData.gs3Links.map((data, index) => {
                      return (
                        <div key={index}>
                          <div
                            onClick={() => handleLinkRemove("gs3Links", index)}
                            className={styles2.closeBtnDiv}
                          >
                            <Image
                              src={close}
                              alt="close"
                              fill
                              objectFit="contain"
                              objectPosition="center"
                              className={styles2.closeBtn}
                            ></Image>
                          </div>
                          <div className={styles2.linkTextContainer}>
                            {" "}
                            <p>{data}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className={`${styles2.linksDiv} + ${styles2.borderRight}`}>
                  <h3>Gs4 Links</h3>
                  <div className={`${styles2.links}`}>
                    {formData.gs4Links.map((data, index) => {
                      return (
                        <div key={index}>
                          <div
                            onClick={() => handleLinkRemove("gs4Links", index)}
                            className={styles2.closeBtnDiv}
                          >
                            <Image
                              src={close}
                              fill
                              alt="close"
                              objectFit="contain"
                              objectPosition="center"
                              className={styles2.closeBtn}
                            ></Image>
                          </div>
                          <div className={styles2.linkTextContainer}>
                            {" "}
                            <p>{data}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className={`${styles2.linksDiv} + ${styles2.borderRight}`}>
                  <h3>Optional 1 Links</h3>
                  <div className={`${styles2.links}`}>
                    {formData.optional1Links.map((data, index) => {
                      return (
                        <div key={index}>
                          <div
                            onClick={() =>
                              handleLinkRemove("optional1Links", index)
                            }
                            className={styles2.closeBtnDiv}
                          >
                            <Image
                              src={close}
                              fill
                              alt="close"
                              objectFit="contain"
                              objectPosition="center"
                              className={styles2.closeBtn}
                            ></Image>
                          </div>
                          <div className={styles2.linkTextContainer}>
                            {" "}
                            <p>{data}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className={`${styles2.linksDiv} + ${styles2.borderRight}`}>
                  <h3>Optional 2 Links</h3>
                  <div className={`${styles2.links}`}>
                    {formData.optional2Links.map((data, index) => {
                      return (
                        <div key={index}>
                          <div
                            onClick={() =>
                              handleLinkRemove("optional2Links", index)
                            }
                            className={styles2.closeBtnDiv}
                          >
                            <Image
                              src={close}
                              fill
                              alt="close"
                              objectFit="contain"
                              objectPosition="center"
                              className={styles2.closeBtn}
                            ></Image>
                          </div>
                          <div className={styles2.linkTextContainer}>
                            {" "}
                            <p>{data}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
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

export default AnswersLinksForm;
