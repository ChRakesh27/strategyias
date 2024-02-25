"use client";
import React from "react";
import styles from "../css/search-topper.module.css";
import Image from "next/image";
import searchIcon from "../icons/search.png";
import { useCallback, useEffect, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";

const ServerSearchparams = () => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const handleSearchParams = useCallback(
    (debouncedValue) => {
      let params = new URLSearchParams(window.location.search);
      if (debouncedValue?.length > 0) {
        params.set("search", debouncedValue);
      } else {
        params.delete("search");
      }
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`);
      });
    },
    [pathname, router]
  );

  //   Set initial params

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get("search") ?? "";
    setInputValue(searchQuery);
  }, []);

  //   set mountedd

  useEffect(() => {
    if (debouncedValue.length > 0 && !mounted) {
      setMounted(true);
    }
  }, [debouncedValue, mounted]);

  //   debounce input value

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [inputValue]);

  //   search params

  useEffect(() => {
    if (mounted) handleSearchParams(debouncedValue);
  }, [debouncedValue, handleSearchParams, mounted]);

  return (
    <div className={styles.SearchBar}>
      <div className={styles.SearchIconDiv}>
        <Image
          src={searchIcon}
          fill
          alt="search"
          objectFit="cover"
          objectPosition="center"
          className={styles.searchIcon}
        ></Image>
      </div>
      <input
        type="text"
        className={styles.Search}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        placeholder="Search-toppers/rank/optional-subjects...."
      />
    </div>
  );
};

export default ServerSearchparams;
