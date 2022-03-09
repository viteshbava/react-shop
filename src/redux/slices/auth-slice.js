import { createSlice } from "@reduxjs/toolkit";
import { register, login, logout } from "../actions/auth-actions";

// Get user from localStorage
const localStorageUser = JSON.parse(localStorage.getItem("user"));

const STATE_INIT = {
  user: localStorageUser ? localStorageUser : null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: STATE_INIT,

  reducers: {
    resetUserState: (state) => {
      state.isLoading = false;
      state.error = null;
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
      })
      // LOGIN - REJECTED
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.error = { message: action.payload };
      })
      // LOGOUT - PENDING
      .addCase(logout.pending, (state) => {
        console.log("logout pending");
        state.isLoading = true;
      })
      // lOGOUT - FULFILLED
      .addCase(logout.fulfilled, (state) => {
        console.log("logout fulfilled");
        state.isLoading = false;
        state.user = null;
      })
      // LOGOUT - REJECTED
      .addCase(logout.rejected, (state, action) => {
        console.log("logout rejected");
        state.isLoading = false;
        state.error = { message: action.payload };
      });
  },
});

export const { resetUserState } = authSlice.actions;
export default authSlice.reducer;
