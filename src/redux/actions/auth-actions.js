import { createAsyncThunk } from "@reduxjs/toolkit";
import authServerApi from "../../apis/authServerApi";
import { uiActions } from "../slices/ui-slice";
import { ALERT_TYPE } from "../../components/Feedback/Alert/Alert";
import { cartActions } from "../slices/cart-slice";
import { wishlistActions } from "../slices/wishlist-slice";

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
      thunkAPI.dispatch(
        uiActions.addAlert({
          type: ALERT_TYPE.SUCCESS,
          title: "Registration complete",
          message: "Happy shopping!",
        })
      );
      return response;
    } catch (error) {
      thunkAPI.dispatch(uiActions.showLoadingState(false));
      return thunkAPI.rejectWithValue(error?.message || error.toString());
    }
  }
);

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  thunkAPI.dispatch(uiActions.showLoadingState(true));
  try {
    const response = await authServerApi.login({
      email: user.username,
      password: user.password,
    });
    localStorage.setItem("user", JSON.stringify(response));
    thunkAPI.dispatch(uiActions.showLoadingState(false));
    thunkAPI.dispatch(
      uiActions.addAlert({
        type: ALERT_TYPE.SUCCESS,
        title: `Signed in as ${response.email}`,
        message: "Happy shopping!",
      })
    );
    // dispatch(fetchUserCart(1));
    return response;
  } catch (error) {
    thunkAPI.dispatch(uiActions.showLoadingState(false));
    return thunkAPI.rejectWithValue(error?.message || error.toString());
  }
});

// Logout user
export const logout = createAsyncThunk(
  "auth/logout",
  async ({ onSuccess = () => {}, onError = () => {} }, thunkAPI) => {
    thunkAPI.dispatch(uiActions.showLoadingState(true));
    try {
      // If there was any async logic to await, it would go here
      localStorage.removeItem("user");
      thunkAPI.dispatch(
        uiActions.addAlert({
          type: ALERT_TYPE.SUCCESS,
          title: "You have signed out",
          message: "See you next time!",
        })
      );
      thunkAPI.dispatch(uiActions.showLoadingState(false));
      onSuccess();
    } catch (error) {
      thunkAPI.dispatch(uiActions.showLoadingState(false));
      onError();
      return thunkAPI.rejectWithValue(error?.message || error.toString());
    }
  }
);
