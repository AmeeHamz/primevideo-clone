import { SET_MSG } from "./actionTypes";
const init = {
  msg: null,
};
export const feedbackReducer = (state = init, { type, payload }) => {
  switch (type) {
    case SET_MSG:
      return {
        ...state,
        msg: payload,
      };
    default:
      return state;
  }
};