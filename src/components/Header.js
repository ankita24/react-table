import React from "react";
import { headers } from "../constants";

const Header = (props) => {
  return (
    <>
      <div
        style={{ textAlign: "right", width: "240px", paddingBottom: "10px" }}
      >
        <div className="flexDiv">
          <div style={{ marginLeft: 75 }}>Filters</div>
          <div style={{ marginLeft: 5 }}>Sorting</div>
          <div style={{ marginLeft: 0 }}>Filtered</div>
        </div>
        {headers.map(({ value, label }) => {
          return (
            <div style={{ paddingTop: "5px" }} key={value}>
              <label>{label}</label>
              <input
                style={{ marginLeft: 40 }}
                type="checkbox"
                name={value}
                value={value}
                defaultChecked={props.config.sortingList[value]}
                onClick={props.handleSorting}
              />
              <input
                style={{ marginLeft: 50 }}
                type="checkbox"
                name={value}
                value={value}
                defaultChecked={props.config.filterableList[value]}
                onClick={props.handleFilters}
              />
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
      <label htmlFor="header">Fix Header</label>

      <input
        onClick={props.handlePagination}
        type="checkbox"
        name="pagination"
        value="pagination"
        defaultChecked={props.config.pagination}
        id="pagination"
      />
      <label htmlFor="pagination">Enable Pagination</label>
      {props.config.pagination ? (
        <select
          onChange={(e) => {
            props.handleSize(e.target.value);
          }}
        >
          <option value="5">Show 5</option>
          <option value="10">Show 10</option>
          <option value="15">Show 15</option>
        </select>
      ) : (
        ""
      )}
      <input
        key={props.currentPage + props.config.pagination}
        style={{ margin: "10px", padding: "10px" }}
        placeholder="Search"
        onChange={props.handleSearch}
      />
    </>
  );
};

export default Header;
