import {
  APP_LOGGED_IN_REQUEST,
  APP_LOGGED_IN_SUCCESS,
  APP_LOGGED_IN_FAILURE,
} from "../actions/types";

const defautState = {
  isLoggingIn: false,
  isLogged: false,
  isLoggedError: false,
  data: null,
};

export default (state = defautState, action) => {
  switch (action.type) {
    case APP_LOGGED_IN_REQUEST:
      return Object.assign({}, defautState, {
        isLoggingIn: true,
      });
    case APP_LOGGED_IN_SUCCESS:
      return Object.assign({}, state, {
        isLoggingIn: false,
        isLogged: true,
        data: action.payload,
      });
    case APP_LOGGED_IN_FAILURE:
      return Object.assign({}, defautState, {
        isLoggedError: action.payload.message,
      });
    default:
      return state;
  }
};
