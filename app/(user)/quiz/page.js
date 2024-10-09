"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { test_series, current_affairs, toppers_copies } from "./courses";
import axios from "axios";
function DashBoard() {
  const { data: session } = useSession();
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [accordion, setAccordion] = useState([false, false, false]);

  useEffect(() => {
    async function fetchDate() {
      //   const response = await axios.get(
      //     "/api/quiz/getQuizUser?email=chipparakesh01@gmail.com"
      //   );
      //   setRegisteredCourses(response.data.res);
      if (session?.user) {
        const response = await axios.get(
          "api/quiz/getQuizUser?email=" + session?.user.email
        );
        setRegisteredCourses(response.data.res);
      }
    }
    fetchDate();
  }, [session?.user]);

  function isCourseRegister(id) {
    for (let data of registeredCourses) {
      if (data.course.id == id) {
        return true;
      }
    }
    return false;
  }

  const containerClassName =
    session?.user.role === "admin" ? "adminDashboard" : "";

  return (
    <>
      <div className={"dashboard " + containerClassName}>
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
                    <p>Rs {ele.price}/-</p>
                  </div>
                  <div className="cart-footer">
                    {isCourseRegister(ele.id) ? (
                      <div className="cart-footer-start-btn">
                        <Link href={"/quiz/" + ele.id} className="btn btn-red">
                          Start
                        </Link>
                      </div>
                    ) : (
                      <div className="cart-footer-btns">
                        <div>
                          <Link
                            href={"/quiz/view-details"}
                            className="btn btn-red"
                          >
                            View Details
                          </Link>
                        </div>
                        <div>
                          <Link href={"/quiz/register"} className="btn btn-red">
                            Buy Now
                          </Link>
                        </div>
                      </div>
                    )}
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
                    <p>Rs {ele.price}/-</p>
                  </div>
                  <div className="cart-footer">
                    {isCourseRegister(ele.id) ? (
                      <div className="cart-footer-start-btn">
                        <Link href={"/quiz/" + ele.id} className="btn btn-red">
                          Start
                        </Link>
                      </div>
                    ) : (
                      <div className="cart-footer-btns">
                        <div>
                          <Link
                            href={"/quiz/view-details"}
                            className="btn btn-red"
                          >
                            View Details
                          </Link>
                        </div>
                        <div>
                          <Link href={"/quiz/register"} className="btn btn-red">
                            Buy Now
                          </Link>
                        </div>
                      </div>
                    )}
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
                    <p>RS {ele.price}/-</p>
                  </div>
                  <div className="cart-footer topper-copy">
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
