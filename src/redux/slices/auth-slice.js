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
    reset: (state) => {
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER - PENDING
      .addCase(register.pending, (state) => {
        console.log("Made it to extraReducer, register.pending!");
        state.isLoading = true;
      })
      // REGISTER - FULLFILLED
      .addCase(register.fulfilled, (state, action) => {
        console.log("Made it to extraReducer, register.fulfilled!");
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      // REGISTER - REJECTED
      .addCase(register.rejected, (state, action) => {
        console.log("Made it to extraReducer, register.rejected!");
        state.user = null;
        state.isLoading = false;
        state.error = { message: action.payload };
      })
      // LOGIN - PENDING
      .addCase(login.pending, (state) => {
        console.log("Made it to extraReducer, login.pending!");
        state.isLoading = true;
      })
      // LOGIN - FULLFILLED
      .addCase(login.fulfilled, (state, action) => {
        console.log("Made it to extraReducer, login.fulfilled!");
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      // LOGIN - REJECTED
      .addCase(login.rejected, (state, action) => {
        console.log("Made it to extraReducer, login.rejected!");
        state.user = null;
        state.isLoading = false;
        state.error = { message: action.payload };
      })
      // LOGOUT - FULFILLED
      .addCase(logout.pending, (state) => {
        console.log("Made it to extraReducer, logout.pending!");
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        console.log("Made it to extraReducer, logout.fulfilled!");
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        console.log("Made it to extraReducer, logout.rejected!");
        state.isLoading = false;
        state.error = { message: action.payload };
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
