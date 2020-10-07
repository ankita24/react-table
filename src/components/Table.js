import React from "react";
import { SortIcon } from "./sort-icon";

const TableHeader = ({ value, label, onClick, sortOrder, disabled }) => {
  function handleClick() {
    if (disabled) {
      return false;
    }
    onClick(value);
  }
  return (
    <th key={value} className="thItem" role="button" onClick={handleClick}>
      {label} <SortIcon name={sortOrder} />
    </th>
  );
};

const Table = ({ headers, data, order, handleHeaderClick, config,handleSearch }) => {
  if (!data.length) {
    return null;
  }
  return (
    <table style={{ width: "100%" }}>
      <thead>
        <tr>
          {headers.map(({ value, label }) => {
            return (
              <td key={value}>
                {config.filterableList[value] ? (
                  <input
                    placeholder={`Search for ${label}`}
                    onKeyDown={(e) =>
                      handleSearch(e, value)
                    }
                  />
                ) : (
                  ""
                )}
              </td>
            );
          })}
        </tr>
      </thead>
      <thead>
        <tr>
          {headers.map(({ value, label }) => {
            return (
              <TableHeader
                key={value}
                value={value}
                label={label}
                sortOrder={order[value]}
                onClick={handleHeaderClick}
                disabled={!config.sortingList[value]}
              />
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.capital}</td>
              <td>
                <img src={item.flag} width="20" alt="flag" />
              </td>
              <td>{item.region}</td>
              <td>{item.cioc}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
