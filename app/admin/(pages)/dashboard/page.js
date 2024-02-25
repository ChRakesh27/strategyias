"use client";
import { formatDistanceToNow ,format} from "date-fns";
import { useState } from "react";
import React, { useEffect } from "react";
import styles from "../../(styles)/(pages-style)/dashboard.module.css";
const Page = () => {
  const [allUsersShow, setAllUsersShow] = useState(false);
  const [sortedUserActivityData, setSortedUserActivityData] = useState([]);
  const [recentActivityShow, setRecentActivityShow] = useState(true);
  const [userActivityData, setuserActivityData] = useState([]);
  const [allUsersData, setAllUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredRecentActivity, setFilteredRecentActivity] = useState([]);
  const [filteredAllUsers, setFilteredAllUsers] = useState([]);
  useEffect(() => {
    const filteredRecent = sortedUserActivityData.filter((data) => {
      return (
        data.userName.toLowerCase().includes(searchInput.toLowerCase()) ||
        data.userEmail.toLowerCase().includes(searchInput.toLowerCase()) ||
        data.message.toLowerCase().includes(searchInput.toLowerCase())
      );
    });
    setFilteredRecentActivity(filteredRecent);

    const filteredAll = allUsersData.filter((data) => {
      return (
        data.userName.toLowerCase().includes(searchInput.toLowerCase()) ||
        data.email.toLowerCase().includes(searchInput.toLowerCase())
      );
    });
    setFilteredAllUsers(filteredAll);
  }, [searchInput, sortedUserActivityData, allUsersData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch("/api/admin/get-user-activity");
        let userDataresponse = await fetch("/api/admin/getuser");
        let userData = await userDataresponse.json();
        let user = await response.json();

        const sortedUserActivity = user.userAct.slice().sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        setuserActivityData(sortedUserActivity);
        setSortedUserActivityData(sortedUserActivity);
        const lastActiveMap = new Map();

        sortedUserActivity.forEach((activity) => {
          if (activity.message === "User logged In") {
            const userEmail = activity.userEmail;
            const currentTimestamp = new Date(activity.createdAt).getTime();

            if (lastActiveMap.has(userEmail)) {
              const previousTimestamp = lastActiveMap.get(userEmail);

              if (currentTimestamp > previousTimestamp) {
                lastActiveMap.set(userEmail, currentTimestamp);
              }
            } else {
              lastActiveMap.set(userEmail, currentTimestamp);
            }
          }
        });

        const updatedUserData = userData.data.map((user) => {
          const lastActiveTime = lastActiveMap.get(user.email);

          return {
            ...user,
            lastActive: lastActiveTime
              ? formatDistanceToNow(lastActiveTime, {
                  addSuffix: true,
                })
              : "Never Logged In",
          };
        });

        const sortedUpdatedUserData = updatedUserData.slice().sort((a, b) => {
          if (
            a.lastActive === "Never Logged In" &&
            b.lastActive === "Never Logged In"
          ) {
            return 0;
          }
          if (a.lastActive === "Never Logged In") {
            return 1;
          }
          if (b.lastActive === "Never Logged In") {
            return -1;
          }

          return new Date(b.lastActive) - new Date(a.lastActive);
        });

        setAllUsers(sortedUpdatedUserData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleClick = (e) => {
    if (e.target.id === "allUsersBtn") {
      setRecentActivityShow(false);
      setAllUsersShow(true);
    } else if (e.target.id === "recentActiveBtn") {
      setAllUsersShow(false);
      setRecentActivityShow(true);
    }
  };

  return (
    <div>
      <div className={styles.mainContainer}>
        <div className={styles.searchBarContainer}>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search Users ..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.headingSection}>
          <h1>Users</h1>
        </div>

        <div className={styles.optionsContainer}>
          <button
            id="allUsersBtn"
            onClick={(e) => {
              handleClick(e);
            }}
            className={`${styles.allUsersBtn} ${
              allUsersShow ? styles.activeBtn : ""
            }`}
          >
            All Users
          </button>

          <button
            id="recentActiveBtn"
            onClick={(e) => {
              handleClick(e);
            }}
            className={`${styles.recentActivityBtn} ${
              recentActivityShow ? styles.activeBtn : ""
            }`}
          >
            Recent Activity
          </button>
        </div>
        <div className={styles.paginationDiv}>
          <div className={styles.totalData}>
            {recentActivityShow ? (
              <div>{filteredRecentActivity.length}</div>
            ) : (
              <></>
            )}
            {allUsersShow ? <div> {filteredAllUsers.length}</div> : <></>}
          </div>
        </div>
        {recentActivityShow ? (
          <div className={styles.listContainer}>
            <div className={styles.listHeadingDiv}>
              <div className={styles.listHeading}>Name</div>
              <div className={styles.listHeading}>Email</div>
              <div className={styles.listHeading}>Activity</div>
              <div className={styles.listHeading}>Account type</div>
              <div className={styles.listHeading}>Activity Time</div>
            </div>

            {filteredRecentActivity.map((data, index) => {
              const exactTime = format(
                new Date(data.createdAt),
                "yyyy-MM-dd HH:mm:ss"
              );
              return (
                <div key={index} className={styles.listItemsDiv}>
                  <div className={styles.listItems}>{data.userName}</div>
                  <div className={styles.listItems}>{data.userEmail}</div>
                  <div className={styles.listItems}>{data.message}</div>
                  <div className={styles.listItems}>Normal</div>
                  <div className={styles.listItems}>{exactTime}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}
        {allUsersShow ? (
          <div className={styles.listContainer}>
            <div className={styles.listHeadingDiv}>
              <div className={styles.listHeading}>Name</div>
              <div className={styles.listHeading}>Email</div>
              <div className={styles.listHeading}>Registed Date</div>
              <div className={styles.listHeading}>Account type</div>
              <div className={styles.listHeading}>Last Active</div>
            </div>

            {filteredAllUsers.map((data, index) => {
              const createdAtDate = new Date(data.createdAt);

              const formattedDate = `${String(
                createdAtDate.getMonth() + 1
              ).padStart(2, "0")}/${String(createdAtDate.getDate()).padStart(
                2,
                "0"
              )}/${createdAtDate.getFullYear()}`;
              return (
                <div key={index} className={styles.listItemsDiv}>
                  <div className={styles.listItems}>{data.userName}</div>
                  <div className={styles.listItems}>{data.email}</div>
                  <div className={styles.listItems}>{formattedDate}</div>
                  <div className={styles.listItems}>Normal static</div>
                  <div className={styles.listItems}>{data.lastActive}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Page;
