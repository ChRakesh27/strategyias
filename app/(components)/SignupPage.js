"use client";

import React, { useEffect, useState } from "react";
import styles from "./(styles)/signuppage.module.css";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

import Link from "next/link";

import { useSession } from "next-auth/react";
import axios from "axios";

const SignPage = () => {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const [emailAlert, setEmailAlert] = useState("");
  const [passAlert, setPassAlert] = useState("");
  const [passwordAlert, setPasswordAlert] = useState(false);
  const [userNameAlert, setUserNameAlert] = useState("");
  // Function to check the strength of the password
  const isStrongPassword = (password) => {
    // Customize your password strength criteria
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    setEmailAlert("");
    setPassAlert("");
    setUserNameAlert("");
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (e.target.name === "password") {
      const isPasswordStrong = isStrongPassword(e.target.value);
      setPasswordAlert(!isPasswordStrong);
    } else if (e.target.name === "email") {
      const isEmailValid = isValidEmail(e.target.value);
      setEmailAlert(!isEmailValid);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (userData.username === "") {
        setUserNameAlert("Username is required.");
        return;
      } else if (userData.email === "") {
        setEmailAlert("Email is needed.");
        return;
      } else if (userData.password === "") {
        setPassAlert("password is needed.");
        return;
      }

      //   const response = await fetch("http://localhost:3001/api/signup", {
      //     headers: {
      //       method: "POST",
      //       body: JSON.stringify(userData),
      //     },
      //   });
      const response = await axios.post(
        "http://localhost:3001/api/signup",
        userData
      );

      toast.success("sign up success!.", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });

      router.push("/login/LoginPage");
    } catch (err) {
     
      if (err.response && err.response.data.message) {
        setEmailAlert("User already exists");
        toast.error("User already exists!");
      } else {
        alert("An error occurred while signing up. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    sessionStatus !== "authenticated" && (
      <div className={styles.all}>
        <div className={styles.loginMainContainer}>
          <div className={styles.loginContainer}>
            <div className={styles.loginHeading}>
              <h1>Truly</h1>
              <h2>IAS</h2>
            </div>

            <form className={styles.loginForm} action="">
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

              <div className={styles.inputDiv}>
                <input
                  type="text"
                  placeholder="User Name"
                  name="username"
                  value={userData.username}
                  onChange={handleInputChange}
                />
                {userNameAlert && <p>{userNameAlert}</p>}
              </div>
              <div className={styles.inputDiv}>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                />
                {emailAlert && <p>{emailAlert}</p>}
                {emailAlert && <p>Enter a valid email address.</p>}
              </div>

              <div className={styles.inputDiv}>
                <input
                  type="password"
                  placeholder="Password "
                  name="password"
                  value={userData.password}
                  onChange={handleInputChange}
                />
                {passAlert && <p>{passAlert}</p>}
                {passwordAlert && (
                  <p>
                    Password must be at least 8 characters long and include at
                    least one uppercase letter, one lowercase letter, and one
                    digit.
                  </p>
                )}
              </div>

              <div className={styles.loginBtnDiv}>
                <button onClick={handleSubmit} className={styles.loginBtn}>
                  {loading ? "processing" : "Sign Up"}
                </button>
                <div className={styles.subOptions}>
                  <Link href="/login/LoginPage">Already Have an Account?</Link>
                </div>
              </div>

              <div className={styles.otherOptions}>
                <p>Or you can login using </p>
                <div className={styles.otherOptionsIconDiv}>
                  {/* <Image
                    className={styles.icons}
                    href=""
                    alt=""
                    src={facebook}
                  ></Image>
                  <Image className={styles.icons} href="" src={github}></Image>
                  <Image className={styles.icons} href="" src={social}></Image> */}
                </div>
              </div>
              <div className={styles.policy}>
                <p>
                  {" "}
                  This site is protected by reCAPTCHA and the Google Privacy
                  Policy and Terms of Service apply.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default SignPage;
