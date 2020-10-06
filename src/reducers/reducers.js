export const initialState = {
  dataToShow: [],
  data: [],
  order: {},
  size: undefined
};

const ASC = "asc";
const DESC = "desc";

export const orderReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA": {
      const { size, pageNumber } = action.payload;
      if (size && pageNumber) {
        return {
          ...state,
          data: action.payload.data.slice(0, size),
          size
        };
      }

      return {
        ...state,
        data: action.payload.data,
        initialData: action.payload.data
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
            // ...state.order, // if you add this line, it will remember the last sort for the column (also line 45)
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
          // ...state.order,
          [name]: DESC, // Assuming the default order is ascending
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
      return state;
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
