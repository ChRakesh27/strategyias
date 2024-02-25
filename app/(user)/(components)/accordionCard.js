"use client";
import { IoIosArrowDown } from "react-icons/io";
import React from "react";
import styles from "../(styles)/prelimsNotesPage.module.css";
import { useState } from "react";
const AccordionCard = ({ title, solution, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div onClick={toggleAccordion} key={index} className={styles.faqsDiv}>
      <div className={styles.faqTitle}>
        <h2>
          {index + 1}. {title}
        </h2>
        <IoIosArrowDown size={30} />
      </div>

      <div
        className={`${styles.faqContent} ${isOpen ? styles.accordionOpen : ""}`}
      >
        <p dangerouslySetInnerHTML={{ __html: solution }}></p>
      </div>
    </div>
  );
};

export default AccordionCard;
