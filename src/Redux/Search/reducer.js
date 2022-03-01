import { SEARCHED } from "./actionTypes";

const initState = {
  searched: [],
};

export const searchReducer = (state = initState, { type, payload }) => {
  // console.log("type", type, payload);
  switch (type) {
    case SEARCHED:
      return {
        ...state,
        searched: payload,
      };
    default:
      return state;
  }
};
