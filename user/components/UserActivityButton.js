"use client";
import styles from "../css/UserCard.module.css";
import React from "react";
import UserActivityFunc from "@/app/(components)/UserActivityFunc";
import { useSession } from "next-auth/react";
const UserActivityButton = ({nameOfbutton , slug,classname }) => {
  const { data: session, status } = useSession();
  // console.log("session ", session);
  // console.log("slug ", slug);
  const handleUserActivity = async () => {
    if (session && slug) {
      await UserActivityFunc(
        `Visited ${slug} page`,
        session?.user?.name,
        session?.user?.email
      );
    }
    return;
  };

  return (
    <button
      onClick={(e) => {
        handleUserActivity();
      }}
      type="submit"
      className={styles[`${classname}`]}
    >
      {nameOfbutton}
    </button>
  );
};

export default UserActivityButton;
