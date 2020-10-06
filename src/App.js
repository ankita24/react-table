import React, { useReducer } from "react";
import Headers from "./components/Header";
import Table from "./components/Table";
import { headers } from "./constants";
import {
  initialStateConfig,
  setHeader,
  setPagination,
  setSorting
} from "./reducers/configReducers";
import { initialState, setData, toggleOrder } from "./reducers/reducers";
import rootReducers from "./rootReducers";
import "./styles.css";
import Pagination from "./components/Pagination";

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
      const data = info.map(({ name, capital, flag, region, cioc }) => ({
        name,
        capital,
        flag,
        region,
        cioc
      }));
      dispatch(setData({ data }));
    }
  };

  const handleHeader = () => {
    dispatchConfig(setHeader());
  };
  const handlePagination = (e) => {
    dispatchConfig(setPagination());

    dispatch(
      setData({
        size: !!e.target.checked ? 5 : undefined,
        pageNumber: 1,
        data: state.initialData
      })
    );
  };
  // bro?
  const handleSorting = (e) => {
    dispatchConfig(setSorting(e.target.value));
  };
  const total =
    state.initialData && state.size
      ? [
          ...Array(
            Math.ceil(state.initialData.length / Number(state.size))
          ).keys()
        ]
      : [];
  React.useEffect(() => {
    document.body.className = config.header ? "fixed" : "notFixed";
  }, [config.header, config.pagination, state.size]);

  const handleHeaderClick = (name) => {
    dispatch(toggleOrder(name));
  };
  const handleSize = (value) => {
    dispatch(setData({ size: value, pageNumber: 1, data: state.initialData }));
  };
  return (
    <div className="App">
      <Headers
        handleHeader={handleHeader}
        handlePagination={handlePagination}
        handleSize={handleSize}
        pagination={config.pagination}
        handleSorting={handleSorting}
        sortingList={config.sortingList}
      />
      <Table
        headers={headers}
        data={state.data}
        order={state.order}
        handleHeaderClick={handleHeaderClick}
        sortingList={config.sortingList}
      />
      {config.pagination ? <Pagination total={total}  /> : ""}
    </div>
  );
}
