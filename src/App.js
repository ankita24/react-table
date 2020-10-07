import React, { useReducer } from "react";
import Headers from "./components/Header";
import Table from "./components/Table";
import { headers } from "./constants";
import {
  initialStateConfig,
  setFilter,
  setHeader,
  setPagination,
  setSorting
} from "./reducers/configReducers";
import {
  initialState,
  setData,
  toggleOrder,
  setPaginatedData,
  setSize
} from "./reducers/reducers";
import rootReducers from "./rootReducers";
import "./styles.css";
import Pagination from "./components/Pagination";
import { pick } from "./util";

export default function App() {
  React.useEffect(() => {
    fetchData();
  }, []);
  const { orderReducer, configReducers } = rootReducers();

  const [state, dispatch] = useReducer(orderReducer, initialState);
  const [config, dispatchConfig] = useReducer(
    configReducers,
    initialStateConfig
  );
  const fetchData = async () => {
    const response = await fetch(`https://restcountries.eu/rest/v2/all`);
    if (response.ok) {
      let info = await response.json();
      const data = info.map((country) => {
        return pick(country, headers.map(header => header.value))
      })
      dispatch(setData({ data }));
    }
  };
  React.useEffect(() => {
    if (config.pagination) dispatch(setPaginatedData(1));
  }, [config.pagination]);

  const handleHeader = () => {
    dispatchConfig(setHeader());
  };
  const handlePagination = (e) => {
    dispatchConfig(setPagination());
  };

  const handleSorting = (e) => {
    dispatchConfig(setSorting(e.target.value));
  };
  const total =
    state.total && state.size ? Math.ceil(state.total / Number(state.size)) : 0;

  React.useEffect(() => {
    document.body.className = config.header ? "fixed" : "notFixed";
  }, [config.header, config.pagination, state.size]);

  const handleHeaderClick = (name) => {
    dispatch(toggleOrder(name));
  };
  const handleSize = (value) => {
    dispatch(setSize(value));
  };

  const handlePageNumber = (value) => {
    dispatch(setPaginatedData(value));
  };
  const handleFilters = (e) => {
    dispatchConfig(setFilter(e.target.value));
  };
  const handleSearch = (e, value) => {
    if (e.keyCode === 13) {
      dispatch(
        setData({
          size: state.size,
          pageNumber: 1,
          searchValue: e.target.value,
          value,
          data: state.initialData
        })
      );
    }
  };
  return (
    <div className="App">
      <Headers
        handleHeader={handleHeader}
        handlePagination={handlePagination}
        handleSize={handleSize}
        config={config}
        handleSorting={handleSorting}
        handleFilters={handleFilters}
      />
      <Table
        headers={headers}
        data={state.data}
        order={state.order}
        handleHeaderClick={handleHeaderClick}
        config={config}
        handleSearch={handleSearch}
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
