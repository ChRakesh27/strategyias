import React from "react";
import mongoose from "mongoose";
import prelimsNotes from "@/models/prelimsNotes";
import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import AccordionCard from "../../(components)/accordionCard";
import styles from "../../(styles)/prelimsNotesPage.module.css";
const getNotes = async (subject, topic) => {
  await mongoose.connect(process.env.MONGO_URI);
  let slug = `${subject}/${topic}`;
  const note = await prelimsNotes.find({ slug: slug });

  return note;
};

const page = async ({ params }) => {

  const note = await getNotes(params.slug[0], params.slug[1]);

  if (params.slug.length > 2 || note.length === 0) {
    return (
      <div className={styles.mainContainer}>
        <div className={styles.wrapper}>
          <h1>This page is not available</h1>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.wrapper}>
        <div className={styles.breadCrumbContainer}>
          <Link href="">prelims-notes</Link> <MdOutlineKeyboardArrowRight />
          <Link href="">{params.slug[0]}</Link> <MdOutlineKeyboardArrowRight />
          <Link href="">{params.slug[1]}</Link>
        </div>

        <div className={styles.mainContentContainer}>
          <h1 className={styles.prelimsNotesTitle}>{note[0].title}</h1>
          <p dangerouslySetInnerHTML={{ __html: note[0].content }}></p>
        </div>

        <div className={styles.faqContainer}>
          <h2 className={styles.faqHeading}>Instant Recall Questions (IRQs)</h2>

          {note[0].faqs.map((data, index) => {
            return (
              <AccordionCard
                key={index}
                title={data.title}
                solution={data.solution}
                index={index}
              ></AccordionCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default page;
