"use client";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import styles from "./css/Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth";
import profileAvatar from "./icons/836.jpg";
import toast from "react-hot-toast";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";

import NavBar from "@/components/NavBar";

const Navbar = () => {
  const [hiddenNav, sethiddenNav] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  const [profileOptions, setProfileOptions] = useState(false);
  const { data: session, status } = useSession();
  

  const handleMenu = () => {
    sethiddenNav(!hiddenNav);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 758) {
        setShowHamburger(true);
      } else {
        setShowHamburger(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return status !== "loading" ? (
    session?.user?.role === "admin" ? (
      <NavBar></NavBar>
    ) : (
      <div className={styles.navBarMainContainer}>
        <div className={styles.navbarWrapper}>
          {showHamburger && hiddenNav && (
            <div className={`${styles.navbarHidden}`}>
              <div className={styles.navEle}>
                <Link href={"/"}>Home</Link>
              </div>
              <div className={styles.navEle}>
                <Link href={""}> Subject Topper</Link>
              </div>
              <div className={styles.navEle}>
                <Link href={""}> Contact </Link>
              </div>
              <div className={styles.navEle}>
                <Link href={""}> About</Link>
              </div>

              {session ? (
                <Link
                  href={"/api/auth/signout?callbackUrl=/"}
                  className={styles.profileOptions}
                >
                  Logout
                </Link>
              ) : (
                <>
                  <Link href={"/api/auth/signin"}>
                    {" "}
                    <button className={styles.loginBtn}>log In</button>
                  </Link>
                  <Link href={"/signup/signuppage"}>
                    {" "}
                    <button className={styles.signupBtn}>Register</button>
                  </Link>
                </>
              )}

             
            </div>
          )}

          {/* main navbar  */}

          <div className={styles.NavbarContainer}>
            {!showHamburger && (
              <div className={styles.NavbarDiv}>
                <div className={styles.Navbar}>
                  <div className={styles.icon}>
                    <Link href={"/"}>
                      <h3>STRATEGY IAS</h3>
                    </Link>
                  </div>
                  <div
                    className={`${styles.NavbarElements} ${styles.NavbarElementsSelect}`}
                  >
                    <Link href={"/"}> Home</Link>
                  </div>
                  <div className={styles.NavbarElements}>
                    <Link href={""}> Subject Topper</Link>
                  </div>
                  <div className={styles.NavbarElements}>
                    <Link href={""}> Contact </Link>
                  </div>
                  <div className={styles.NavbarElements}>
                    <Link href={""}> About</Link>
                  </div>
                </div>
              </div>
            )}
            {!showHamburger && (
              <div className={styles.logBtnsDiv}>
                {!showHamburger && session ? (
                 <>
                  <Link
                    href={"/api/auth/signout?callbackUrl=/"}
                    className={styles.profileOptions}
                  >
                    Logout
                  </Link>
                                  <div className={styles.profileDiv}>
                                  <div
                                    onClick={() => {
                                      setProfileOptions(!profileOptions);
                                    }}
                                    className={styles.LoginDiv}
                                  >
                                    <Image
                                      src={profileAvatar}
                                      fill
                                      objectFit="cover"
                                      objectPosition="center"
                                      className={styles.profileImage}
                                    ></Image>
                                  </div>
                                  {profileOptions && (
                                    <div className={styles.profileOptionsDiv}>
                                      <div className={styles.currentlyInDiv}>
                                        <div className={styles.currentlyInImageDiv}>
                                          <Image
                                            src={profileAvatar}
                                            fill
                                            objectFit="cover"
                                            objectPosition="center"
                                            className={styles.currentlyInImage}
                                          ></Image>
                                        </div>
                                        <div className={styles.currentlyInName}>
                                          <p>{session?.user?.email}</p>
                                          <p>{session?.user?.name}</p>
                                        </div>
                                      </div>
                                      <Link href={"/"}>
                                        <div
                                          onClick={() => {
                                            setProfileOptions(false);
                                          }}
                                          className={styles.profileOptions}
                                        >
                                          Profile
                                        </div>
                                      </Link>
                                    </div>
                                  )}
                                </div></>
                ) : (
                  !showHamburger && (
                    <>
                      <Link href={"/api/auth/signin"}>
                        {" "}
                        <button className={styles.loginBtn}>log In</button>
                      </Link>
                      <Link href={"/signup/signuppage"}>
                        {" "}
                        <button className={styles.signupBtn}>Register</button>
                      </Link>
                    </>
                  )
                )}
              </div>
            )}
        
            {showHamburger && (
              <>
                <div className={styles.icon}>
                  <Link href={"/"}>
                    <h3>STRATEGY IAS</h3>
                  </Link>
                </div>
                <div onClick={handleMenu} className={styles.hamburger}>
                  <div
                    className={`${styles.hamburgerLine1} ${
                      hiddenNav ? styles.hamburgerLine1Change : ""
                    }`}
                  ></div>
                  <div
                    className={`${styles.hamburgerLine2} ${
                      hiddenNav ? styles.hamburgerLine2Change : ""
                    }`}
                  ></div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    )
  ) : (
    <>Loading...</>
  );
};

export default Navbar;
