"use client";
import { usePathname } from "next/navigation";
import React from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import NavLink from "next/link";
const NavBar = () => {
  const [hiddenNav, sethiddenNav] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  const pathname = usePathname();
  const session = useSession();

  const handleMenu = () => {
    sethiddenNav(!hiddenNav);
  };

  useEffect(() => {
    const handleResize = () => {
      // if (window.innerWidth <= 540) {
      if (window.innerWidth <= 758) {
        setShowHamburger(true);
      } else {
        setShowHamburger(false);
      }
    };

    // Set the initial state based on the window width
    handleResize();

    // Attach the event listener for window resize
    window.addEventListener("resize", handleResize);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      {" "}
      {hiddenNav && (
        <div className={styles.navbarHidden}>
          <div className={styles.navEle}>
            <Link href={"/"}>Home</Link>
          </div>
          {/* <div className={styles.navEle}>
            <Link href={`/admin-page`}>Admin Page</Link>
          </div> */}
          <div className={styles.navEle}>
            <Link href={"/admin/toppers-page"}>Add Topper</Link>
          </div>
          <div className={styles.navEle}>
            <Link href={"/admin/add-answers"}>Add Answers</Link>
          </div>
          <div className={styles.navEle}>
            <Link href={"/admin/add-pyqs"}>Add Pyqs </Link>
          </div>
          <div className={styles.navEle}>
            <Link href={"/admin/add-current-affairs"}>Add CurrentAffairs </Link>
          </div>
          <div className={styles.navEle}>
            <Link href={"/admin/add-links"}>Add Links </Link>
          </div>
          <div className={styles.navEle}>
            <Link href={"/admin/add-prelims-notes"}>Add prelims notes </Link>
          </div>
          <div className={styles.navEle}>
            <Link href={"/admin/dashboard"}>Dashboard</Link>
          </div>
          {session && (
            <Link href={"/api/auth/signout?callbackUrl=/"}>
              <button className={styles.loginBtn}>Logout</button>
            </Link>
          )}
        </div>
      )}
      <div className={styles.navbarMainContainer}>
        <div className={styles.navbarContainer}>
          <div className={styles.navEleDiv}>
            <div className={styles.logo}>
              <h1>STRATEGY IAS</h1>
            </div>
            {!showHamburger && (
              <>
                <div className={styles.navBarHeading}>ADMIN TOOLS</div>
                <div
                  className={`${styles.navEle} ${
                    pathname === "/all-toppers" ? styles.activeLink : ""
                  }`}
                >
                  <Link href={"/"}>Home</Link>
                </div>
                {/* <div className={styles.navEle}>
                  <Link href={`/admin-page`}>Admin Page</Link>
                </div> */}
                <div
                  className={`${styles.navEle} ${
                    pathname === "/admin/toppers-page" ? styles.activeLink : ""
                  }`}
                >
                  <Link href={"/admin/toppers-page"}>Add Topper</Link>
                </div>
                <div
                  className={`${styles.navEle} ${
                    pathname === "/admin/add-answers" ? styles.activeLink : ""
                  }`}
                >
                  <Link href={"/admin/add-answers"}>Add Answers</Link>
                </div>
                <div
                  className={`${styles.navEle} ${
                    pathname === "/admin/add-pyqs" ? styles.activeLink : ""
                  }`}
                >
                  <Link href={"/admin/add-pyqs"}>Add Pyqs </Link>
                </div>

                <div
                  className={`${styles.navEle} ${
                    pathname === "/admin/add-current-affairs"
                      ? styles.activeLink
                      : ""
                  }`}
                >
                  <Link href={"/admin/add-current-affairs"}>
                    Add CurrentAffairs{" "}
                  </Link>
                </div>
                <div
                  className={`${styles.navEle} ${
                    pathname === "/admin/add-links" ? styles.activeLink : ""
                  }`}
                >
                  <Link href={"/admin/add-links"}>Add Links </Link>
                </div>
                <div
                  className={`${styles.navEle} ${
                    pathname === "/admin/add-prelims-notes"
                      ? styles.activeLink
                      : ""
                  }`}
                >
                  <Link href={"/admin/add-prelims-notes"}>
                    Add prelims notes{" "}
                  </Link>
                </div>
                <div
                  className={`${styles.navEle} ${
                    pathname === "/admin/dashboard" ? styles.activeLink : ""
                  }`}
                >
                  <Link href={"/admin/dashboard"}>Dashboard</Link>
                </div>
                <div
                  className={`${styles.navEle} ${
                    pathname === "/admin/delete-prelims-notes"
                      ? styles.activeLink
                      : ""
                  }`}
                >
                  <Link href={"/admin/delete-prelims-notes"}>
                    Delete prelims notes{" "}
                  </Link>
                </div>
                <div className={styles.loginBtnDiv}>
                  <Link href={"/api/auth/signout?callbackUrl=/"}>
                    <button className={styles.loginBtn}>Logout</button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
        {showHamburger && (
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
        )}
      </div>
    </>
  );
};

export default NavBar;
