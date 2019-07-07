import { oauth } from "react-native-force";
import {
  APP_LOGGED_IN_REQUEST,
  APP_LOGGED_IN_SUCCESS,
  APP_LOGGED_IN_FAILURE,
} from './types';

export const appLoggedInSuccess = (payload) => {
  return {
    type: APP_LOGGED_IN_SUCCESS,
    payload,
  }
}

export const appLoggedInFailure = (message) => {
  return {
    type: APP_LOGGED_IN_FAILURE,
    payload: new Error(message || 'Something went wrong!'),
  }
}

export const checkAppAuthentication = () => {
  return (dispatch) => {
    dispatch({
      type: APP_LOGGED_IN_REQUEST,
    });

    const authentication = new Promise((resolve, reject) => {
      oauth.getAuthCredentials(
        (res) => resolve(res),
        () => {
          oauth.authenticate(
            (res) => resolve(res),
            error => reject("Failed to authenticate:" + error)
          );
        }
      );
    })

    return authentication
    .then((res) => dispatch(
      appLoggedInSuccess(res)
    ))
    .catch((err) => dispatch(
      appLoggedInFailure(err)
    ))
  }
}