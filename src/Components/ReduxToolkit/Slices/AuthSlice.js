import { createSlice } from "@reduxjs/toolkit";

//variable for the auto logout
export let logOutTimer;
// helper function for auto log out

const calculateRemaningTime = (expiresIn) => {
  const currentTime = new Date().getTime();
  const adjustedTime = new Date(expiresIn).getTime();
  const remainingTime = adjustedTime - currentTime;

  return remainingTime;
};

export const logoutHandler = () => {
  localStorage.removeItem("idToken");
  localStorage.removeItem("userinfo");
  localStorage.removeItem("expiresIn");

  if (logOutTimer) {
    clearTimeout(logOutTimer);
  }
};
export const retrieveValidToken = () => {
  const getStoredToken = localStorage.getItem("idToken");
  const getStoredExpiratonTime = localStorage.getItem("expiresIn");

  const remainingTime = calculateRemaningTime(getStoredExpiratonTime);

  if (remainingTime <= 60000) {
    localStorage.removeItem("idToken");
    localStorage.removeItem("userinfo");
    localStorage.removeItem("expiresIn");
    return null;
  }
  return {
    idToken: getStoredToken,
    duration: remainingTime,
  };
};

let getValidToken = retrieveValidToken();
let intialToken;
if (getValidToken) {
  intialToken = getValidToken.idToken;
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: intialToken,
    isLoggedIn: !!intialToken,
    notification: {
      isLoading: false,
      status: null,
      message: null,
    },
  },
  reducers: {
    login(state, action) {
      state.token = action.payload.idToken;
      state.isLoggedIn = !!state.token;
      localStorage.setItem(
        "expiresIn",
        JSON.stringify(action.payload.expiresIn)
      );
      const remainingTime = calculateRemaningTime(action.payload.expiresIn);
      logOutTimer = setTimeout(logoutHandler, remainingTime);
    },
    logout(state) {
      logoutHandler();
      state.token = "";
      state.isLoggedIn = false;
    },
    notify(state, action) {
      state.notification = {
        isLoading: action.payload.isLoading,
        status: action.payload.status,
        message: action.payload.message,
      };
    },
  },
});
export const { logout, login, notify } = authSlice.actions;

export default authSlice;
