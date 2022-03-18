import { createAsyncThunk } from "@reduxjs/toolkit";
import authServerApi from "../../apis/authServerApi";
import { uiActions } from "../slices/ui-slice";
import { ALERT_TYPE } from "../../components/Feedback/Alert/Alert";
import {
  setAccessTokenTimer,
  setAccessToken,
  resetUserState,
} from "../slices/auth-slice";

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
      thunkAPI.dispatch(
        startRefreshTokenCycle({
          immediately: false,
          expiresIn: response.expiresIn,
          refreshToken: response.refreshToken,
        })
      );
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
export const login = createAsyncThunk(
  "auth/login",
  async ({ user, onSuccess }, thunkAPI) => {
    thunkAPI.dispatch(uiActions.showLoadingState(true));
    try {
      const response = await authServerApi.login({
        email: user.username,
        password: user.password,
      });
      localStorage.setItem("user", JSON.stringify(response));
      thunkAPI.dispatch(
        startRefreshTokenCycle({
          immediately: false,
          expiresIn: response.expiresIn,
          refreshToken: response.refreshToken,
        })
      );
      thunkAPI.dispatch(uiActions.showLoadingState(false));
      thunkAPI.dispatch(
        uiActions.addAlert({
          type: ALERT_TYPE.SUCCESS,
          title: `Signed in as ${response.email}`,
          message: "Happy shopping!",
        })
      );
      if (onSuccess) onSuccess();
      return response;
    } catch (error) {
      thunkAPI.dispatch(uiActions.showLoadingState(false));
      return thunkAPI.rejectWithValue(error?.message || error.toString());
    }
  }
);

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

// Change password
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ newPassword }, thunkAPI) => {
    console.log("Change password");
    console.log(newPassword);
    thunkAPI.dispatch(uiActions.showLoadingState(true));
    const { idToken } = thunkAPI.getState().auth.user;
    try {
      const response = await authServerApi.changePassword({
        idToken,
        password: newPassword,
      });
      console.log("Change password successful");
      thunkAPI.dispatch(uiActions.showLoadingState(false));
      const { idToken: newIdToken, refreshToken, expiresIn } = response;
      const { accessTokenTimer } = thunkAPI.getState().auth;
      console.log("Timer being cleared: ", accessTokenTimer);
      clearTimeout(accessTokenTimer);
      thunkAPI.dispatch(
        startRefreshTokenCycle({
          immediately: false,
          expiresIn,
          refreshToken,
        })
      );
      const user = {
        ...thunkAPI.getState().auth.user,
        idToken: newIdToken,
        refreshToken,
        expiresIn,
      };
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      console.log("Change password failed");
      console.log(error);
      thunkAPI.dispatch(uiActions.showLoadingState(false));
    }
  }
);

// Refresh access token
export const startRefreshTokenCycle = createAsyncThunk(
  "auth/startRefreshTokenCycle",
  async ({ immediately, expiresIn, refreshToken }, thunkAPI) => {
    const refreshAccessToken = async (interval) => {
      try {
        console.log("Refreshing access token");
        // console.log("Using this refresh token: ", refreshToken);
        const response = await authServerApi.refreshAccessToken(refreshToken);
        thunkAPI.dispatch(setAccessToken(response.access_token));
        console.log("Setting off the next timer now: ", interval);
        const timerId = setTimeout(
          () => refreshAccessToken(interval),
          interval
        );
        thunkAPI.dispatch(setAccessTokenTimer(timerId));
      } catch (error) {
        console.log(error);
        localStorage.removeItem("user");
        thunkAPI.dispatch(resetUserState());
        // if immediately is true, it means we have come from starting the app (e.g. refreshing the page), therefore no real need to show alert warning.  Alert warning only makes sense if user is already using app and they are logged out becuase of invalid refresh token
        if (!immediately)
          thunkAPI.dispatch(
            uiActions.addAlert({
              type: ALERT_TYPE.WARNING,
              title: "Your session has expired",
              message: "Please sign in again to keep shopping.",
            })
          );
      }
    };

    // Use a refresh interval that is a percentage shorter than the actual interval to ensure the token is obtained in time
    const interval = expiresIn * 1000 * 0.6;

    console.log("Starting refresh cycle...");
    console.log(expiresIn);

    const timerId = setTimeout(
      () => refreshAccessToken(interval),
      immediately ? 0 : interval
    );
    thunkAPI.dispatch(setAccessTokenTimer(timerId));
  }
);
