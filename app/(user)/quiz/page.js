"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
function DashBoard() {
  //   const { data: session } = useSession();
  //   console.log("user", session);

  const [accordion, setAccordion] = useState([false, false, false]);
  const test_series = [
    { id: "TS_BWMP", validity: "1 Year", title: "Book wise MCQ Practice" },
    { id: "TS_SWMP", validity: "1 Year", title: "Subject wise MCQ Practice" },
    { id: "TS_TWMP", validity: "1 Year", title: "Topic wise MCQ Practice" },
    { id: "TS_10QD", validity: "1 Year", title: "10 Questions / day" },
    {
      id: "TS_50QD",
      validity: "1 Year",
      title: "50 Questions / Day",
      subtitle: "MCQ Practice 1 Year",
    },
    {
      id: "TS_100QD",
      validity: "1 Year",
      title: "100 Questions / Day",
      subtitle: "50 Tests",
    },
  ];

  const current_affairs = [
    {
      id: "CA_DCA",
      validity: "1 Year",
      title: "Daily Current Affairs",
      subtitle: "10 Questions / Day",
    },
    {
      id: "CA_10QD",
      validity: "1 Year",
      title: "10 Questions / Day",
      subtitle: "5 Tests",
    },
  ];
  const toppers_copies = [
    { title: "GS 1 Topper Copy", subtitle: "RS 199/-" },
    { title: "GS 2 Topper Copy", subtitle: "RS 199/-" },
    { title: "GS 3 Topper Copy", subtitle: "RS 199/-" },
    { title: "GS 4 Topper Copy", subtitle: "RS 199/-" },
    { title: "Essay Topper Copy", subtitle: "RS 199/-" },
    { title: "All Copies", subtitle: "RS 499/-" },
  ];

  return (
    <>
      <div className="dashboard">
        <div className="test-series">
          <div
            className="accordion"
            onClick={() => {
              setAccordion([!accordion[0], accordion[1], accordion[2]]);
            }}
          >
            <h2>Test Series</h2>
            {accordion[0] && (
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.8">
                  <path d="M24 20L16 12L8 20H24Z" fill="black" />
                </g>
              </svg>
            )}
            {!accordion[0] && (
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 12L16 20L24 12H8Z" fill="black" />
              </svg>
            )}
          </div>
          {accordion[0] && (
            <div className="card-list">
              {test_series.map((ele, index) => (
                <div className="cart" key={index}>
                  <div className="validity-tag">
                    <svg
                      width="131"
                      height="40"
                      viewBox="0 0 131 53"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M108.766 53H0V0H108.766L131 24.0156L108.766 53Z"
                        fill="url(#paint0_linear_12_377)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_12_377"
                          x1="0"
                          y1="26.5"
                          x2="131"
                          y2="26.5"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#FF4E17" />
                          <stop offset="1" stopColor="#FF910F" />
                        </linearGradient>
                      </defs>
                    </svg>

                    <span>
                      <b>{ele.validity}</b> <br /> <p>validity</p>
                    </span>
                  </div>
                  <div className="cart-body">
                    <div>
                      <b>{ele.title}</b>
                    </div>
                    <p>{ele.subtitle}</p>
                  </div>
                  <div className="cart-footer">
                    <Link href={"/quiz/" + ele.id} className="btn btn-red">
                      Start
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="current-affairs">
          <div
            className="accordion"
            onClick={() => {
              setAccordion([accordion[0], !accordion[1], accordion[2]]);
            }}
          >
            <h2>Current affairs</h2>
            {accordion[1] && (
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.8">
                  <path d="M24 20L16 12L8 20H24Z" fill="black" />
                </g>
              </svg>
            )}
            {!accordion[1] && (
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 12L16 20L24 12H8Z" fill="black" />
              </svg>
            )}
          </div>
          {accordion[1] && (
            <div className="card-list">
              {current_affairs.map((ele, index) => (
                <div className="cart" key={index}>
                  <div className="validity-tag">
                    <svg
                      width="131"
                      height="40"
                      viewBox="0 0 131 53"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M108.766 53H0V0H108.766L131 24.0156L108.766 53Z"
                        fill="url(#paint0_linear_12_377)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_12_377"
                          x1="0"
                          y1="26.5"
                          x2="131"
                          y2="26.5"
                          gradientUnits="userSpaceOnUse"
                        ></linearGradient>
                      </defs>
                    </svg>
                    <span>
                      <b> 1 Year</b> <br /> <p>validity</p>
                    </span>
                  </div>
                  <div className="cart-body">
                    <div>
                      <b>{ele.title}</b>
                    </div>
                    <p>{ele.subtitle}</p>
                  </div>
                  <div className="cart-footer">
                    <Link href={"/quiz/" + ele.id} className="btn btn-red">
                      Start
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="toppers-copies">
          <div
            className="accordion"
            onClick={() => {
              setAccordion([accordion[0], accordion[1], !accordion[2]]);
            }}
          >
            <h2>Topper’s COPIES</h2>
            {accordion[2] && (
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.8">
                  <path d="M24 20L16 12L8 20H24Z" fill="black" />
                </g>
              </svg>
            )}
            {!accordion[2] && (
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 12L16 20L24 12H8Z" fill="black" />
              </svg>
            )}
          </div>
          {accordion[2] && (
            <div className="card-list">
              {toppers_copies.map((ele, index) => (
                <div className="cart" key={index}>
                  <div className="cart-body">
                    <div>
                      <b>{ele.title} </b>
                    </div>
                    <p>{ele.subtitle}</p>
                  </div>
                  <div className="cart-footer">
                    <Link href={"/quiz"} className="btn btn-red">
                      Buy Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DashBoard;
