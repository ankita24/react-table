export const initialState = {
  initialData: [],
  data: [],
  order: {},
  size: 5,
  pageNumber: 1,
  searchValue: ""
};

const ASC = "asc";
const DESC = "desc";

export const orderReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA": {
      return {
        ...state,
        data: action.payload.data,
        initialData: action.payload.data,
        total: action.payload.data.length
      };
    }

    case "SET_PAGINATION_DATA": {
      const { pageNumber, isPaginationEnabled } = action;
      return {
        ...state,
        total: state.initialData.length,
        data: isPaginationEnabled
          ? state.initialData.slice(
              Number((pageNumber - 1) * state.size), //ye
              Number((pageNumber - 1) * state.size) + Number(state.size)
            )
          : state.initialData,
        pageNumber
      };
    }

    case "SET_SIZE": {
      const { size } = action;
      return {
        ...state,
        size,
        pageNumber: 1,
        total: state.initialData.length,
        data: state.initialData.slice(0, size)
      };
    }

    case "TOGGLE_ORDER": {
      const { name } = action;
      if (name in state.order) {
        const direction = state.order[name];

        const nextDirection = direction === ASC ? DESC : ASC;
        return {
          ...state,
          order: {
            [name]: nextDirection
          },
          data: state.data.sort((a, b) => {
            if (a[name] > b[name]) {
              return nextDirection === ASC ? 1 : -1;
            }
            return nextDirection === ASC ? -1 : 1;
          })
        };
      }

      return {
        ...state,
        order: {
          [name]: DESC,
          data: state.data.sort((a, b) => {
            if (a[name] > b[name]) {
              return -1;
            }
            return 1;
          })
        }
      };
    }

    default: {
      return { ...state };
    }
  }
};

export function toggleOrder(name) {
  return {
    type: "TOGGLE_ORDER",
    name
  };
}

export function setData(data) {
  return {
    type: "SET_DATA",
    payload: data
  };
}

export function setPaginatedData(pageNumber, isPaginationEnabled) {
  return {
    type: "SET_PAGINATION_DATA",
    pageNumber,
    isPaginationEnabled
  };
}

export function setSize(size) {
  return {
    type: "SET_SIZE",
    size
  };
}
