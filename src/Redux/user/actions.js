import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_FAILURE,
  LOGOUT,
  SET_REGISTER,
  ADD_WATCHLIST,
  GET_ACTIVE_USER,
} from "./actionTypes";
import axios from "axios";
const loginRequest = (uname, pass) => {
  return {
    type: LOGIN_REQUEST,
    payload: {
      username: uname,
      password: pass,
    },
  };
};
const loginSuccess = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload: payload,
  };
};

const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
};
const registerRequest = () => {
  return {
    type: REGISTER_REQUEST,
  };
};

const registerFailure = (error) => {
  return {
    type: REGISTER_FAILURE,
    payload: error,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const setRegister = (payload) => {
  return {
    type: SET_REGISTER,
    payload: payload,
  };
};

export const updateWatchList = (payload) => {
  return {
    type: ADD_WATCHLIST,
    payload,
  };
};

export const getActiveUser = () => (dispatch) => {
  const accessToken = localStorage.getItem("accesstoken");
  axios({
    method: "GET",
    url: "http://localhost:8001/api/users",
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => {
      console.log("logged in", res.data[0]);
      dispatch(loginSuccess(res.data[0]));
      return true;
    })
    .catch((res) => {
      console.log("error", res.response);
      dispatch(loginFailure(res.response));
    });
};

export const Loginreq = (email, pass) => (dispatch) => {
  dispatch(loginRequest(email, pass));
  const config = {
    method: "POST",
    url: "http://localhost:8001/api/login",
    data: {
      email: email,
      password: pass,
    },
  };

  return axios(config)
    .then((res) => {
      console.log(res.data.accesstoken);
      localStorage.setItem("accesstoken", res.data.accesstoken);
      return axios({
        method: "GET",
        url: "http://localhost:8001/api/users",
        headers: {
          authorization: `Bearer ${res.data.accesstoken}`,
        },
      })
        .then((res) => {
          console.log("logged in", res.data[0]);
          dispatch(loginSuccess(res.data[0]));
          return true;
        })
        .catch((res) => {
          console.log("error", res.response.data);
          dispatch(loginFailure(res.response.data));
        });
    })
    .catch((res) => {
      console.log("error", res.response.data);
      dispatch(loginFailure(res.response.data));
    });
};

export const Regreq = (payload) => (dispatch) => {
  dispatch(registerRequest());
  const config = {
    method: "post",
    url: "http://localhost:8001/api/users",
    data: payload,
  };

  return axios(config)
    .then((res) => {
      console.log(res);
      dispatch(setRegister(true));
      // dispatch(registerSuccess(res.data));

      return true;
    })
    .catch((res) => {
      console.log("error", res.response.data);
      dispatch(registerFailure(res.response.data));
    });
};

export const newWatchList = (payload) => (dispatch) => {
  // dispatch(tempupdate(payload))
  var config = {
    method: "put",
    url: "http://localhost:8001/api/add_watchlist",
    headers: {
      "Content-Type": "application/json",
    },
    data: payload,
  };

  axios(config)
    .then(function (response) {
      dispatch(updateWatchList(response.data));
      dispatch(getActiveUser());
    })
    .catch(function (error) {
      console.log(error);
    });
};
