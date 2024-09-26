"use client";
import React, { useEffect, useState } from "react";
import styles from "../../(styles)/(pages-style)/userPermission.module.css";
import Image from "next/image";
import axios from "axios";

function UserPermission() {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState();
  const [users, setUsers] = useState([
    {
      _id: "",
      name: "Rakesh",
      email: "rakesh@gmail.com",
      course: "xyz",
      date: "11/12/2024",
    },
    {
      _id: "",
      name: "Rakesh",
      email: "rakesh@gmail.com",
      course: "xyz",
      date: "11/12/2024",
    },
    {
      _id: "",
      createdAt: "",
      permissionDate: "",
      expireDate: "",
      userName: "",
      email: "",
      phone: "",
      payment: "",
      course: "",
    },
  ]);

  async function fetchUsers() {
    setIsLoading(true);
    const response = await axios.get("/api/admin/quizUsers/getUsers");
    setUsers(response.data.res);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  function dateFormate(isoString) {
    if (isoString) {
      const date = new Date(isoString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      return formattedDate + "\n" + date.toLocaleTimeString();
    }
  }

  function showPaymentImg(image) {
    setIsModelOpen(true);
    setImage(image);
  }

  function ModelClose() {
    setIsModelOpen(false);
    setImage("");
  }
  async function onChangeStatus(status, userData) {
    setIsLoading(true);
    const response = await axios.post("/api/admin/quizUsers/updateUser", {
      id: userData._id,
      data: {
        status,
      },
    });
    const updatedUsers = users.map((user) => {
      if (user._id == userData._id) {
        user.status = status;
      }
      return user;
    });
    setUsers(updatedUsers);
    setIsLoading(false);
  }

  async function onDeleteUser(userData) {
    setIsLoading(true);
    const response = await axios.post("/api/admin/quizUsers/deleteUser", {
      id: userData._id,
    });
    const updatedUsers = users.filter((user) => user._id != userData._id);
    setUsers(updatedUsers);
    setIsLoading(false);
  }

  return (
    <div className={styles.mainContainer}>
      {isLoading && (
        <div className={styles.loading}>
          <svg viewBox="25 25 50 50" className={styles.loaderContainer}>
            <circle cx="50" cy="50" r="20" className={styles.loader}></circle>
          </svg>
        </div>
      )}
      <div className={styles.filter}>
        <div>
          <span>
            From: <input type="date" className={styles.dateFilter} />
          </span>
          <span>
            To: <input type="date" className={styles.dateFilter} />
          </span>
        </div>
        <div>
          <span>
            <input type="checkbox" defaultChecked /> Pending
          </span>
          <span>
            <input type="checkbox" defaultChecked /> Accept
          </span>
          <span>
            <input type="checkbox" defaultChecked /> Reject
          </span>
          <span>
            <input type="checkbox" defaultChecked /> Expire
          </span>
        </div>
        <div>
          <span>
            <button className={styles.resetBtn}>Reset</button>
          </span>
          <span>
            <button className={styles.resetBtn}>Refresh</button>
          </span>
        </div>
      </div>
      <div className={styles.PerBody}>
        <table className={styles.table} width="100%">
          <thead className={styles.tableHead}>
            <tr>
              <th width="2%">S.No</th>
              <th width="8%">Date</th>
              <th width="10%">Name</th>
              <th width="10%">Email</th>
              <th width="10%">Phone</th>
              <th width="8%">Target Year</th>
              <th width="10%">Course</th>
              <th width="10%">Payment</th>
              <th width="10%">Expire Date</th>
              <th width="10%">Status</th>
              <th width="2%">Delete</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {users.map((ele, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{dateFormate(ele.registerAt)}</td>
                  <td>{ele.userName}</td>
                  <td>{ele.email}</td>
                  <td>{ele.phone}</td>
                  <td>{ele.course.targetYear}</td>
                  <td>{ele.course.name}</td>
                  <td
                    onClick={() => {
                      showPaymentImg(ele.paymentImg);
                    }}
                  >
                    {ele.paymentImg && (
                      <Image
                        src={ele.paymentImg}
                        width={30}
                        height={30}
                        alt="payment Image"
                      />
                    )}
                  </td>
                  <td>{dateFormate(ele.expireAt)}</td>
                  <td>
                    <select
                      className={styles.status}
                      value={ele.status}
                      onChange={(e) => onChangeStatus(e.target.value, ele)}
                    >
                      <option value={"pending"}>Pending</option>
                      <option value={"accept"}>accept</option>
                      <option value={"reject"}>Reject</option>
                      <option value={"expire"}>Expire</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className={styles.deletebtn}
                      onClick={() => onDeleteUser(ele)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash3"
                        viewBox="0 0 16 16"
                      >
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {isModelOpen && (
        <div className={styles.Model}>
          <div className={styles.ModelBody}>
            {image && (
              <Image
                src={image}
                width={400}
                height={600}
                className={styles.ModelImage}
                alt="payment Image"
              />
            )}
            <div>
              <button className={styles.closeModel} onClick={ModelClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserPermission;
