"use client";

import React, { useEffect } from "react";
import styles from "../(style)/SigninPage.module.css";
import Image from "next/image";
// import { useRouter } from "next/navigation";
import loginImage from "../../../public/Loginback.jpg";
import googleIcon from "../(utils)/(imgs)/google.png";
// import Link from "next/link";
// import axios from "axios";
// import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

const page = () => {
  // const { data: session } = useSession({
  //   required: true,
  // });

  // const router = useRouter();
  // const [emailAlert, setEmailAlert] = useState(false);
  // const [passAlert, setPassAlert] = useState(false);
  // const [userData, setUserData] = useState({
  //   email: "",
  //   password: "",
  // });
  // const [loading, setLoading] = useState(false);
  // const handleInputChange = (e) => {
  //   setEmailAlert(false);
  //   setPassAlert(false);
  //   const { name, value } = e.target;
  //   setUserData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     setLoading(true);
  //     const response = await axios.post("/api/Login/route", userData);

  //     toast.success(`Logged In successfully , welcome back!`);
  //     router.push("/");
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  return (
    <div className={styles.all}>
      <div className={styles.loginMainContainer}>
        <div className={styles.ImageContainer}>
          <Image
            src={loginImage}
            alt={"Login Image"}
            fill
            objectFit="cover"
            objectPosition="center"
            className={styles.userProfile}
          ></Image>
        </div>

        <div className={styles.loginContainer}>
          <div className={styles.loginHeading}>
            <h1>STRATEGY IAS</h1>

            <p>
              Welcome to <span>STRATEGY IAS</span> Your Gateway to Success in
              the IAS Journey!{" "}
            </p>
            <p>Login to your account!</p>
          </div>
          <div className={styles.googleBtnContainer}>
            <button
              className={styles.googleBtn}
              onClick={() => signIn("google")}
            >
              <Image
                src={googleIcon}
                alt={"Google Image"}
                fill
                objectFit="contain"
                objectPosition="center"
                className={styles.googleImage}
              ></Image>{" "}
              Sign in with Google
            </button>
          </div>
          {/* <form className={styles.loginForm} action="">
        {/* <div className={styles.optionDiv}>
          <div>
            <input type="radio" id="admin" name="userType" value="admin" />
            <label for="admin">Admin</label>
          </div>

          <div>
            <input type="radio" id="user" name="userType" value="user" />
            <label for="user">User</label>
          </div>
        </div> */}

          {/* <div className={styles.inputDiv}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
          {emailAlert && <p>Email is needed!</p>}
        </div>

        <div className={styles.inputDiv}>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
          />
          {passAlert && <p>Password is needed!</p>}
        </div>
        <div className={styles.loginBtnDiv}>
          <button onClick={handleSubmit} className={styles.loginBtn}>
            Sign in
          </button>
          <div className={styles.subOptions}>
            <a href="">forget password?</a>
            <Link href="/signup/signuppage">Sign up</Link>
          </div>
        </div>

        {/* <div className={styles.otherOptions}>
          <p>Or you can login using </p>
          <div className={styles.otherOptionsIconDiv}>
            <Image className={styles.icons} href="" src={facebook}></Image>
            <Image className={styles.icons} href="" src={github}></Image>
            <Image className={styles.icons} href="" src={social}></Image>
          </div>
        </div> */}
          {/* <div className={styles.policy}>
          <p>
            {" "}
            This site is protected by reCAPTCHA and the Google Privacy
            Policy and Terms of Service apply.
          </p>
        </div>
      </form>  */}
        </div>
      </div>
    </div>
  );
};

export default page;
