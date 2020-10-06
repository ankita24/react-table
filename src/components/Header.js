import React from "react";
import { headers } from "../constants";
const Header = (props) => {
  return (
    <>
      <div
        style={{ textAlign: "right", width: "200px", paddingBottom: "10px" }}
      >
        <div className="flexDiv">
          <div style={{ marginLeft: 25 }}>Filters</div>
          <div style={{ marginLeft: 25 }}>Sorting</div>
          <div style={{ marginLeft: 25 }}>Filtered</div>
        </div>
        {headers.map(({ value, label }) => {
          return (
            <div style={{ paddingTop: "5px" }} key={value}>
              <label>
                {label}
                <input
                  style={{ marginLeft: 50 }}
                  type="checkbox"
                  name={value}
                  value={value}
                  defaultChecked={props.sortingList[value]}
                  onClick={props.handleSorting}
                />
                <input
                  style={{ marginLeft: 50 }}
                  type="checkbox"
                  name={value}
                  value={value}
                />
              </label>
            </div>
          );
        })}
      </div>
      <input
        onClick={props.handleHeader}
        type="checkbox"
        name="header"
        value="header"
        id="header"
      />
      <label htmlFor="header">Is header fixed?</label>

      <input
        onClick={props.handlePagination}
        type="checkbox"
        name="pagination"
        value="pagination"
        id="pagination"
      />
      <label htmlFor="pagination">Pagination enable?</label>
      {props.pagination ? (
        <select
          onChange={(e) => {
            props.handleSize(e.target.value);
          }}
        >
          <option>5</option>
          <option>10</option>
          <option>15</option>
        </select>
      ) : (
        ""
      )}
    </>
  );
};

// for should be htmlFor and input should have the same as id for it to work
export default Header;