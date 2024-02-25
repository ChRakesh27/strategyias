import React from "react";
import { useSession } from "next-auth/react";
import styles from "../css/verifyAlert.module.css";
import axios from "axios";
const VerifyAlert = ({ alertMessage }) => {
  const { data: session } = useSession();

  if (!session || session?.user.isVerified) {
    return null;
  }

  const handleOnVerify = async (e) => {
    e.preventDefault();
    const data = { email: session?.user.email, emailType: "VERIFY" };
    try {
      const response = await axios.post("/api/user/mailer", data);

      if (response) {
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContainer}>
        <p>{alertMessage}</p>
        <button>verify</button>
      </div>
    </div>
  );
};

export default VerifyAlert;
