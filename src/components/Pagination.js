import React from "react";
import "../styles.css";

const Pagination = ({ currentPage, total, ...props }) => {
  const pageNumbersToShow = [
    currentPage,
    currentPage + 1,
    currentPage + 2,
    currentPage + 3,
    currentPage + 4
  ];
  return (
    <div>
      Showing Page {currentPage} of {total} pages
      <div className="flexDiv">
        <button
          disabled={currentPage === 1}
          onClick={() => props.handlePageNumber(currentPage - 1)}
        >
          {"Prev"}
        </button>

        {pageNumbersToShow.map((item) => {
          return item <= total ? (
            <button
              disabled={item === currentPage}
              onClick={() => props.handlePageNumber(item)}
              key={item}
            >
              {item}
            </button>
          ) : (
            ""
          );
        })}

        <button
          disabled={currentPage === total}
          onClick={() => props.handlePageNumber(currentPage + 1)}
        >
          {"Next"}
        </button>
      </div>
    </div>
  );
};
export default Pagination;
