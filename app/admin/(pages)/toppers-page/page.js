"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../(styles)/(pages-style)/Topper.module.css";
import { useState } from "react";
import DeleteSurePop from "@/components/deleteSurePop";

// async function getTopper(){
//   'use server'

// }

const Toppers = () => {
  const [clickedIndex, setClickedIndex] = useState(null);
  const [clickedDelete, setClickedDelete] = useState(false);
  const [selectedTopper, setSelectedTopper] = useState(null);
  const [toppers, setToppers] = useState([]);
  const handleClick = (index) => {
    setClickedIndex((prevIndex) => (prevIndex === index ? null : index));
    setSelectedTopper(toppers[index]);
  };
  const handleDeleteClick = () => {
    setClickedDelete(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/getTopper", {
          headers: {
            Accept: "application/json",
            Method: "GET",
          },
          cache: "no-store",
        });
        const data = await res.json();
      
        setToppers(data.toppers);
        // ...
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className={styles.mainTopperContainer}>
        <div className={styles.wrapper}>
          {clickedDelete && (
            <DeleteSurePop
              nametodelete="Topper"
              handleDeleteClick={handleDeleteClick}
              topper={selectedTopper}
            ></DeleteSurePop>
          )}
          <div className={styles.TopperHeadContainer}>
            <div>
              <h1>Toppers</h1>
            </div>
            <button>
              {" "}
              <Link href={"/admin/add-topper"}>+ Add Topper</Link>
            </button>
          </div>
          <div className={styles.TopperContainer}>
            {toppers &&
              toppers.map((data, index) => {
                return (
                  <div key={index} className={styles.TopperDetails}>
                    <div className={styles.optionsIconDiv}>
                      <Image
                        className={styles.optionsIcon}
                        src={"/option.png"}
                        alt="options"
                        width={25}
                        height={25}
                        onClick={() => {
                          handleClick(index);
                        }}
                      ></Image>
                    </div>
                    {clickedIndex === index && (
                      <div className={styles.optionsContainer}>
                        <div
                          className={styles.midDiv}
                          onClick={() => {
                            setClickedDelete(true);
                          }}
                        >
                          Delete
                        </div>
                        <Link href={`/admin/topper/${data.slug}?action=update`}>
                          <div className={styles.lastDiv}> Update</div>
                        </Link>
                      </div>
                    )}
                    <div
                      className={`${styles.TopperDetails1} ${styles.TopperDetailsMain}`}
                    >
                      <div className={styles.TopperProfileImgdiv}>
                        <Image
                          className={styles.TopperProfileImg}
                          alt={data.firstname + " " + data.lastname}
                          fill
                          priority
                          objectFit="cover"
                          objectPosition="center"
                          src={data.imageUrl}
                        ></Image>
                      </div>
                      <div className={styles.TopperDetailsDivs}>
                        <div className={styles.TopperName}>
                          <p>
                            {data.firstname} {data.lastname}
                          </p>
                        </div>
                      </div>

                      <div className={styles.TopperDetailsDivs1}>
                        <div>
                          <span>Rank: </span> {data.rank}
                        </div>

                        <div>
                          <span>Year: </span>
                          {data.year}
                        </div>
                      </div>
                      <div className={styles.TopperProfileView}>
                        <Link href={`/admin/topper/${data.slug}`}>
                          <button> View Profile</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>{" "}
        </div>
      </div>
    </div>
  );
};
export default Toppers;
