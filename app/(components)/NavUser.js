"use client";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import styles from "./(styles)/Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import profileAvatar from "./(icons)/836.jpg";
import { IconContext } from "react-icons";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import NavBar from "@/components/NavBar";
const Navbar = () => {
  const pathname = usePathname();
  const [hiddenNav, sethiddenNav] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  const [profileOptions, setProfileOptions] = useState(false);
  const [mobileSubjectTopperDropShow, setMobileSubjectTopperDropShow] =
    useState(false);
  const [subjectTopperDropShow, setSubjectTopperDropShow] = useState(false);
  const { data: session, status } = useSession();
  const dropDownRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setSubjectTopperDropShow(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [dropDownRef]);

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
  // 1
  // return <NavBar></NavBar>;
  if (pathname == "/quiz/view-details" || pathname == "/quiz/register") {
    return (
      <></>
      // <div className={styles.landingPageIcon}>
      //   <Link href={"/"}>
      //     <h3>STRATEGY IAS</h3>
      //   </Link>
      // </div>
    );
  }

  return status !== "loading" ? (
    session?.user?.role === "admin" ? (
      <NavBar></NavBar>
    ) : (
      <div className={styles.navBarMainContainer}>
        <div className={styles.navbarWrapper}>
          {showHamburger && hiddenNav && (
            <div className={`${styles.navbarHidden}`}>
              <div className={styles.navEle}>
                <Link
                  href={"/"}
                  className={`${styles.navEle} ${
                    pathname === "/all-toppers" ? styles.activeLink : ""
                  }`}
                >
                  Home
                </Link>
              </div>
              <div className={styles.navEle}>
                <div
                  onClick={() => {
                    setMobileSubjectTopperDropShow(
                      !mobileSubjectTopperDropShow
                    );
                  }}
                  className={styles.mobileViewDropDownDiv}
                >
                  <Link
                    href={""}
                    className={`${styles.navEle} ${
                      pathname === "/toppers-essaywise" ||
                      pathname === "/toppers-gs1wise" ||
                      pathname === "/toppers-gs2wise" ||
                      pathname === "/toppers-gs3wise" ||
                      pathname === "/toppers-gs4wise"
                        ? styles.activeLink
                        : ""
                    }`}
                  >
                    {" "}
                    Subject Topper
                  </Link>
                  <IconContext.Provider
                    value={{ className: styles.downArrowIcon }}
                  >
                    <IoIosArrowDown
                      onClick={() => {
                        setMobileSubjectTopperDropShow(
                          !mobileSubjectTopperDropShow
                        );
                      }}
                      style={{ opacity: 0.4 }}
                      size={20}
                    />
                  </IconContext.Provider>
                </div>

                {mobileSubjectTopperDropShow && (
                  <div className={styles.MobileSubNavbarDropDown}>
                    <Link
                      href={"/toppers-essaywise"}
                      className={`${styles.navEle} ${
                        pathname === "/toppers-essaywise"
                          ? styles.activeLink
                          : ""
                      }`}
                    >
                      <p>Essay</p>
                    </Link>
                    <Link
                      href={"/toppers-gs1wise"}
                      className={`${styles.navEle} ${
                        pathname === "/toppers-gs1wise" ? styles.activeLink : ""
                      }`}
                    >
                      <p>General Studies 1</p>{" "}
                    </Link>
                    <Link
                      href={"/toppers-gs2wise"}
                      className={`${styles.navEle} ${
                        pathname === "/toppers-gs2wise" ? styles.activeLink : ""
                      }`}
                    >
                      <p>General Studies 2</p>
                    </Link>
                    <Link
                      href={"/toppers-gs3wise"}
                      className={`${styles.navEle} ${
                        pathname === "/toppers-gs3wise" ? styles.activeLink : ""
                      }`}
                    >
                      <p>General Studies 3</p>
                    </Link>
                    <Link
                      href={"/toppers-gs4wise"}
                      className={`${styles.navEle} ${
                        pathname === "/toppers-gs4wise" ? styles.activeLink : ""
                      }`}
                    >
                      <p>General Studies 4</p>
                    </Link>
                  </div>
                )}
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
                    <button className={styles.loginBtn}>Log In</button>
                  </Link>
                  {/* <Link href={"/signup"}>
                    {" "}
                    <button className={styles.signupBtn}>Register</button>
                  </Link> */}
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
                    <Link
                      href={"/"}
                      className={`${styles.navEle} ${
                        pathname === "/all-toppers" ? styles.activeLink : ""
                      }`}
                    >
                      {" "}
                      Home
                    </Link>
                  </div>
                  <div className={styles.NavbarElements}>
                    <div>
                      <Link
                        href={""}
                        onClick={() => {
                          setSubjectTopperDropShow(!subjectTopperDropShow);
                        }}
                        className={`${styles.navEle} ${
                          pathname === "/toppers-essaywise" ||
                          pathname === "/toppers-gs1wise" ||
                          pathname === "/toppers-gs2wise" ||
                          pathname === "/toppers-gs3wise" ||
                          pathname === "/toppers-gs4wise"
                            ? styles.activeLink
                            : ""
                        }`}
                      >
                        {" "}
                        Subject Topper
                      </Link>
                      <IconContext.Provider
                        value={{ className: styles.downArrowIcon }}
                      >
                        <IoIosArrowDown
                          onClick={() => {
                            setSubjectTopperDropShow(!subjectTopperDropShow);
                          }}
                          style={{ opacity: 0.4 }}
                          size={20}
                        />
                      </IconContext.Provider>
                    </div>

                    {subjectTopperDropShow ? (
                      <div
                        ref={dropDownRef}
                        className={styles.SubNavbarDropDown}
                      >
                        <Link
                          href={"/toppers-essaywise"}
                          className={`${styles.navEle} ${
                            pathname === "/toppers-essaywise"
                              ? styles.activeLink
                              : ""
                          }`}
                        >
                          <p>Essay</p>
                        </Link>
                        <Link
                          href={"/toppers-gs1wise"}
                          className={`${styles.navEle} ${
                            pathname === "/toppers-gs1wise"
                              ? styles.activeLink
                              : ""
                          }`}
                        >
                          <p>General Studies 1</p>{" "}
                        </Link>
                        <Link
                          href={"/toppers-gs2wise"}
                          className={`${styles.navEle} ${
                            pathname === "/toppers-gs2wise"
                              ? styles.activeLink
                              : ""
                          }`}
                        >
                          <p>General Studies 2</p>
                        </Link>
                        <Link
                          href={"/toppers-gs3wise"}
                          className={`${styles.navEle} ${
                            pathname === "/toppers-gs3wise"
                              ? styles.activeLink
                              : ""
                          }`}
                        >
                          <p>General Studies 3</p>
                        </Link>
                        <Link
                          href={"/toppers-gs4wise"}
                          className={`${styles.navEle} ${
                            pathname === "/toppers-gs4wise"
                              ? styles.activeLink
                              : ""
                          }`}
                        >
                          <p>General Studies 4</p>
                        </Link>
                      </div>
                    ) : (
                      <></>
                    )}
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
                          alt={session?.user?.name}
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
                                alt={session?.user?.name}
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
                    </div>
                  </>
                ) : (
                  !showHamburger && (
                    <>
                      <Link href={"/api/auth/signin"}>
                        {" "}
                        <button className={styles.loginBtn}>Log In</button>
                      </Link>
                      {/* <Link href={"/signup"}>
                        {" "}
                        <button className={styles.signupBtn}>Register</button>
                      </Link> */}
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
