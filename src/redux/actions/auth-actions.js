import { createAsyncThunk } from "@reduxjs/toolkit";
import authServerApi from "../../apis/authServerApi";
import { uiActions } from "../slices/ui-slice";

// Register User
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    thunkAPI.dispatch(uiActions.showLoadingState(true));
    try {
      const response = await authServerApi.register({
        email: user.username,
        password: user.password,
      });
      localStorage.setItem("user", JSON.stringify(response));
      thunkAPI.dispatch(uiActions.showLoadingState(false));
      return response;
    } catch (error) {
      thunkAPI.dispatch(uiActions.showLoadingState(false));
      return thunkAPI.rejectWithValue(error?.message || error.toString());
    }
  }
);
