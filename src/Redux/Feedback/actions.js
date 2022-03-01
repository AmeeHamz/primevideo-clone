import { SET_MSG } from "./actionTypes";
import axios from "axios";
export const setMsg = (payload) => {
  return {
    type: SET_MSG,
    payload,
  };
};
export const feedback = (payload) => (dispatch) => {
  var config = {
    method: "post",
    url: "http://localhost:8001/feedback",
    headers: {
      "Content-Type": "application/json",
    },
    data: payload,
  };
  axios(config)
    .then(function (response) {
      // console.log(response.data);
      dispatch(setMsg(response.data.msg));
    })
    .catch(function (error) {
       console.log(error);
    });
};
