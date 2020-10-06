import React from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";

export function SortIcon({ name = "" }) {
  if (!name) {
    return null;
  }
  if (name === "desc") {
    return <AiOutlineCaretUp />;
  }
  return <AiOutlineCaretDown />;
}
