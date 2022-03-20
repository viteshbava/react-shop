import { createSlice } from "@reduxjs/toolkit";
import {
  register,
  login,
  logout,
  changePassword,
  startRefreshTokenCycle,
} from "../actions/auth-actions";

// Get user from localStorage
const localStorageUser = JSON.parse(localStorage.getItem("user"));

const STATE_INIT = {
  user: localStorageUser ? localStorageUser : null,
  isLoading: false,
  error: null,
  accessTokenTimer: null,
  accessTokenReady: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: STATE_INIT,

  reducers: {
    setAccessToken: (state, action) => {
      console.log("SETTING ACCESS TOKEN - token: ", action.payload);
      console.log("SETTING ACCESS TOKEN - current token: ", state.user.idToken);
      state.user.idToken = action.payload.idToken;
      state.user.expiresIn = action.payload.expiresIn;
      if (!state.accessTokenReady) state.accessTokenReady = true;
    },
    setAccessTokenTimer: (state, action) => {
      console.log("Timer being set: ", action.payload);
      state.accessTokenTimer = action.payload;
    },
    resetUserState: (state, action) => {
      console.log("RESET USER TAKING PLACE! ", action?.payload?.keepUser);
      if (!action?.payload?.keepUser) state.user = null;
      state.isLoading = false;
      state.error = null;
      state.accessTokenTimer = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER - PENDING
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      // REGISTER - FULLFILLED
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
        state.accessTokenReady = true;
      })
      // REGISTER - REJECTED
      .addCase(register.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.error = { message: action.payload };
      })
      // LOGIN - PENDING
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      // LOGIN - FULLFILLED
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
        state.accessTokenReady = true;
      })
      // LOGIN - REJECTED
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.error = { message: action.payload };
      })
      // LOGOUT - PENDING
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      // LOGOUT - FULFILLED
      .addCase(logout.fulfilled, (state) => {
        console.log("Logout fulfilled!");

        clearTimeout(state.accessTokenTimer);
        state.isLoading = false;
        state.accessTokenTimer = null;
        state.user = null;
        state.accessTokenReady = false;
      })
      // LOGOUT - REJECTED
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = { message: action.payload };
      })
      // CHANGE PASSWORD - PENDING
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      // CHANGE PASSWORD - FULFILLED
      .addCase(changePassword.fulfilled, (state, action) => {
        console.log("Change password fulfilled!");

        state.isLoading = false;
        state.error = null;
        state.user = action.payload;
      })
      // CHANGE PASSWORD - REJECTED
      .addCase(changePassword.rejected, (state, action) => {
        console.log("Change password rejected!");
        state.isLoading = false;
        state.error = { message: action.payload };
      })
      // REFRESH ACCESS - FULFILLED
      .addCase(startRefreshTokenCycle.fulfilled, (state, action) => {
        console.log("Starting of refresh access token cycle fulfilled!");
      });
  },
});

export const { resetUserState, setAccessTokenTimer, setAccessToken } =
  authSlice.actions;
export default authSlice.reducer;
