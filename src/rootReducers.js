import { orderReducer } from "./reducers/reducers";
import { configReducers } from "./reducers/configReducers";

const rootReducers = () => {
  return {
    orderReducer,
    configReducers
  };
};

export default rootReducers;
