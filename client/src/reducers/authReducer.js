import {
  USER_LODED,
  USER_LODING,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGOUT_SUCESS,
  LOGIN_SUCESS,
  REGISTER_FAIL,
  REGISTER_SUCESS,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LODING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LODED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGIN_SUCESS:
    case REGISTER_SUCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isAuthenticated: true,
      };

    case LOGIN_FAIL:
    case LOGOUT_SUCESS:
    case AUTH_ERROR:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isLoading: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
