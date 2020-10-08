import { useEffect, useReducer } from "react";
import { configReducers, setHeader, initialStateConfig, setPagination, setSorting, setFilter } from "../reducers/configReducers";

export function useConfig() {
  const [config, dispatchConfig] = useReducer(
    configReducers,
    initialStateConfig
  );
  const handleHeader = () => {
    dispatchConfig(setHeader());
  };
  const handlePagination = () => {
    dispatchConfig(setPagination());
  };

  const handleSorting = (e) => {
    dispatchConfig(setSorting(e.target.value));
  };
  const handleFilters = (e) => {
    dispatchConfig(setFilter(e.target.value));
  };

  useEffect(() => {
    document.body.className = config.header ? "fixed" : "notFixed";
  }, [config.header]);

  return {
    config,
    handleHeader,
    handlePagination,
    handleSorting,
    handleFilters
  };
}
