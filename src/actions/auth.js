import { useHistory } from "react-router";


export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export function receiveLogin() {
  return {
    type: LOGIN_SUCCESS
  };
}

function loginError(payload) {
  return {
    type: LOGIN_FAILURE,
    payload,
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
  };
}

export function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

// logs the user out
export function logoutUser(props) {
  return (dispatch) => {
    dispatch(requestLogout());
    localStorage.clear('authenticated');
    dispatch(receiveLogout());
    props.history.push("/user/login")
  };
}

export function loginUser(creds) {
  console.log("cred",creds);
  return (dispatch) => {
    dispatch(receiveLogin());
    if (creds.email.length > 0 && creds.password.length > 0) {
      localStorage.setItem('authenticated', true)
      // creds.history.push("/")
    } else {
      dispatch(loginError('Something was wrong. Try again'));
    }
  }
}

