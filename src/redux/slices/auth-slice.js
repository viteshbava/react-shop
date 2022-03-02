import { createSlice } from "@reduxjs/toolkit";
import { register } from "../actions/auth-actions";

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
    // PENDING
    builder.addCase(register.pending, (state) => {
      console.log("Made it to extraReducer, register.pending!");
      state.isLoading = true;
    });
    // FULLFILLED
    builder.addCase(register.fulfilled, (state, action) => {
      console.log("Made it to extraReducer, register.fulfilled!");
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    // REJECTED
    builder.addCase(register.rejected, (state, action) => {
      console.log("Made it to extraReducer, register.rejected!");
      state.user = null;
      state.isLoading = false;
      state.error = { message: action.payload };
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
