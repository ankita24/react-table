import React, { useEffect, useMemo, useReducer } from "react";
import Headers from "./components/Header";
import Pagination from "./components/Pagination";
import Table from "./components/Table";
import { headers } from "./constants";
import { useConfig } from "./hooks/useConfig";
import { useSearch } from "./hooks/useSearch";
import {
  initialState,
  orderReducer,
  setData,
  setPaginatedData,
  setSize,
  toggleOrder
} from "./reducers/reducers";
import "./styles.css";
import { pick } from "./util";

export default function App() {
  const [state, dispatch] = useReducer(orderReducer, initialState);
  const {
    config,
    handleFilters,
    handleHeader,
    handlePagination,
    handleSorting
  } = useConfig();

  const { filteredData, handleSearch } = useSearch(
    state.data,
    config.filterableList
  );

  const fetchData = async () => {
    const response = await fetch(`https://restcountries.eu/rest/v2/all`);
    if (response.ok) {
      let info = await response.json();
      const data = info.map((country) => {
        return pick(
          country,
          headers.map((header) => header.value)
        );
      });
      dispatch(setData({ data }));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const total = useMemo(
    () =>
      state.total && state.size
        ? Math.ceil(state.total / Number(state.size))
        : 0,
    [state.total, state.size]
  );

  const handleHeaderClick = (name) => {
    dispatch(toggleOrder(name));
  };
  const handleSize = (value) => {
    dispatch(setSize(value));
  };

  const handlePageNumber = (value) => {
    dispatch(setPaginatedData(value, config.pagination));
  };

  useEffect(() => {
    dispatch(setPaginatedData(1, config.pagination));
  }, [config.pagination]);

  return (
    <div className="App">
      <Headers
        handleHeader={handleHeader}
        handlePagination={handlePagination}
        handleSize={handleSize}
        config={config}
        handleSorting={handleSorting}
        handleFilters={handleFilters}
        handleSearch={handleSearch}
        currentPage={state.pageNumber}
      />
      <Table
        headers={headers}
        data={filteredData}
        order={state.order}
        handleHeaderClick={handleHeaderClick}
        config={config}
      />
      {config.pagination ? (
        <Pagination
          total={total}
          handlePageNumber={handlePageNumber}
          currentPage={state.pageNumber}
        />
      ) : (
        ""
      )}
    </div>
  );
}
