const { useEffect, useState, useCallback } = require("react");
const { uniqueArrayByKey } = require("../util");

export function useSearch(data, filterableList) {
  const [filteredData, setFilteredData] = useState(data);
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearch = useCallback(
    (e) => {
      const { value } = e.target;
      const filters = Object.keys(filterableList).filter(
        (item) => !!filterableList[item]
      );

      if (!filters.length) {
        return false;
      }

      let finalData = [];
      filters.forEach((item) => {
        const arr = data.filter((info) =>
          String(info[item]).toUpperCase().includes(String(value).toUpperCase())
        );
        finalData = [...finalData, ...arr];
      });
      setFilteredData(uniqueArrayByKey(finalData, "name"));
    },
    [filterableList, data]
  );

  return { filteredData, handleSearch };
}
