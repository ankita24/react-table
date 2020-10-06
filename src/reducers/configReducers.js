export const initialStateConfig = {
  header: false,
  pagination: false,
  sortingList: {
    name: false,
    capital: true,
    flag: false,
    region: false,
    cioc: false
  },
  filterableList: []
};

export const configReducers = (state, action) => {
  switch (action.type) {
    case "HEADER":
      return { ...state, header: !state.header };
    case "PAGINATION":
      return { ...state, pagination: !state.pagination };
    case "ENABLE_SORTING":
      const sorting = { ...state.sortingList };
      sorting[action.sort] = !state.sortingList[action.sort];
      return { ...state, sortingList: sorting };
    default:
      return state;
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
