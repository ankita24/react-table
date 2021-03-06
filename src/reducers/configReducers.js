import { headers } from "../constants";

const initialCountryObj = {};
headers.forEach((country) => {
  initialCountryObj[country.value] = true;
});

export const initialStateConfig = {
  header: false,
  pagination: false,
  sortingList: initialCountryObj,
  filterableList: initialCountryObj
};

export const configReducers = (state, action) => {
  switch (action.type) {
    case "HEADER": {
      return {
        ...state,
        header: !state.header
      };
    }
    case "PAGINATION": {
      return {
        ...state,
        pagination: !state.pagination
      };
    }
    case "ENABLE_SORTING": {
      const sorting = { ...state.sortingList };
      sorting[action.sort] = !state.sortingList[action.sort];
      return { ...state, sortingList: sorting };
    }
    case "ENABLE_FILTER": {
      const filters = { ...state.filterableList };
      filters[action.filter] = !state.filterableList[action.filter];
      return { ...state, filterableList: filters };
    }
    default:
      return { ...state };
  }
};
export function setHeader() {
  return {
    type: "HEADER"
  };
}

export function setPagination() {
  return {
    type: "PAGINATION"
  };
}

export function setSorting(value) {
  return {
    type: "ENABLE_SORTING",
    sort: value
  };
}

export function setFilter(value) {
  return {
    type: "ENABLE_FILTER",
    filter: value
  };
}
