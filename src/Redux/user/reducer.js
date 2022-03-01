import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,

  SET_REGISTER,
  ADD_WATCHLIST,
} from "./actionTypes";

const initState = {
  isAuth: false,
  userdata: null,
  error: false,
  errormsg: "",
  status: "",
  userType: "user",
  location: null,
  registerd: false,
  watchlist: [],
};

export const authReducer = (state = initState, { type, payload }) => {
  // console.log("type", type, payload);
  switch (type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
        isAuth: false,
      };
    }
    case LOGIN_SUCCESS: {
      console.log(payload);
      return {
        ...state,
        isAuth: true,
        userType: payload.type,
        userdata: payload,
        error: null,
        watchlist: payload.fav,
      };
    }

    case LOGIN_FAILURE: {
      // console.log(payload);
      return {
        ...state,
        isAuth: false,
        userdata: null,
        error: true,
        errormsg: payload,
      };
    }
    case REGISTER_REQUEST: {
      return {
        ...state,
        isAuth: false,
        loading: true,
        error: null,
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        isAuth: true,
        userdata: payload,
        error: null,
      };
    }

    case REGISTER_FAILURE: {
      return {
        ...state,
        status: payload,
        error: true,
        errormsg: payload,
        userdata:null,
        isAuth: false,
      };
    }

    case LOGOUT: {
      localStorage.removeItem('accesstoken')
      return {
        ...state,
        isAuth: false,
        userType: "user",
        userdata: null,
        watchlist: [],
      };
    }

 

    case SET_REGISTER: {
      return {
        ...state,
        registered: payload,
      };
    }
    case ADD_WATCHLIST: {
      return {
        ...state,
        watchlist: payload,
      };
    }

    default:
      return state;
  }
};
