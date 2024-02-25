import React from "react";
import styles from "./MainPage.module.css";
import Link from "next/link";
const MainPage = () => {
  return (
    <div className={styles.all}>
      <div className={styles.mainContainer}>
        <h1 className={styles.mainHeading}><span className={styles.span2}>Hello</span> <span className={styles.span1}>Truely</span> <span className={styles.span2}>IAS</span> </h1>

        <h3 className={styles.subHeading}>Login Below and get Started</h3>

        <Link className={styles.loginLink} href={"/login/LoginPage"}>Here</Link>
      </div>
    </div>
  );
};

export default MainPage;
