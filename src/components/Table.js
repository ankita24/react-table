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

const Table = ({ headers, data, order, handleHeaderClick, config }) => {
  if (!data.length) {
    return null;
  }
  return (
    <>
      <table style={{ width: "100%" }}>
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
          {data.map((item, index) => {
            return (
              <tr key={item.name + index}>
                {Object.keys(item).map((data) => (
                  <td key={data + item[data]}>{item[data]}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
