import { SEARCHED } from "./actionTypes";
import axios from "axios";

export const searchedData = (payload) => {
  return {
    type: SEARCHED,
    payload,
  };
};

export const searchQuery = (payload) => (dispatch) => {
  var config = {
    method: "post",
    url: "http://localhost:8001/api/medias/search",
    headers: {
      "Content-Type": "application/json",
    },
    data: payload,
  };

  axios(config)
    .then(function (response) {
      // console.log(response.data);
      dispatch(searchedData(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};
