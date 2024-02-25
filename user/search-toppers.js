"use server";

import React from "react";
import styles from "./css/search-topper.module.css";
import Image from "next/image";
import ServerSearchparams from "./components/server-search-params";
import searchIcon from "./icons/search.png";
import UserCard from "./UserCard";

const SearchTopper = ({ Toppers, searchParams }) => {
  // const [selectedOption, setSelectedOption] = useState("AllAsc");

  // const handleSortingOptionChange = (event) => {
  //   const selectedValue = event.target.value;
  //   setSelectedOption(selectedValue);
  // };

  return (
    <div className={styles.MainContainer}>
      <div className={styles.Wrapper}>
        <div className={styles.PageHeadingContainer}>
          <div className={styles.PageHeading}>
            <h1>
              UPSC 2023 TOPPERS <span>RANK WISE</span>
            </h1>
          </div>
        </div>
        <div className={styles.FilterOptionsContainer}>
          <ServerSearchparams></ServerSearchparams>
          {/* <div className={styles.FilterDiv}>
            <p>Filter By:</p>
            <select
              name="sortingOption"
              value={selectedOption}
              className={styles.Filter}
              onChange={handleSortingOptionChange}
            >
              <option value="AllAsc">All (Asc Order)</option>
              <option value="AllDsc">All (Des Order)</option>
              <option value="Latest">Latest</option>
              <option value="lasthr">last hours</option>
              <option value="lastday">last days</option>
              <option value="lastmonth">last months</option>
            </select>
          </div> */}
        </div>
        {searchParams.search !== "" && (
          <p>Showing results for {searchParams.search}</p>
        )}
        <div className={styles.TopperGalaryDiv}>
          {Toppers.map((data, index) => {
            return (
              <UserCard
                data={data}
                key={data.firstname + data.lastname}
              ></UserCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchTopper;
