"use client";

import { IconContext } from "react-icons";

export default function IconProvider({ children }) {
  return (
    <IconContext.Provider >
      {children}
    </IconContext.Provider>
  );
}