import React from "react";
import "../styles.css";

const Pagination = (props) => {
  return (
    <div className="flexDiv">
      {props.total.map((item) => {
        return <button key={item}>{item + 1}</button>;
      })}
    </div>
  );
};
export default Pagination;
