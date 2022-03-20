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
    console.log("auth-actions: login createAsyncThunk...");
    thunkAPI.dispatch(uiActions.showLoadingState(true));
    try {
      const response = await authServerApi.login({
        email: user.username,
        password: user.password,
      });
      localStorage.setItem("user", JSON.stringify(response));
      console.log(
        "Logged in, about to call thunkAPI.dispatch start refresh cycle..."
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
      console.log("Error in login!");
      console.log(error);
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
      const { accessTokenTimer } = thunkAPI.getState().auth;
      console.log("Timer being cleared: ", accessTokenTimer);
      clearTimeout(accessTokenTimer);
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
  async ({ newPassword, onSuccess = () => {} }, thunkAPI) => {
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
      thunkAPI.dispatch(
        uiActions.addAlert({
          type: ALERT_TYPE.SUCCESS,
          title: "Password Updated",
          message: "Your password has been updated.",
        })
      );
      thunkAPI.dispatch(uiActions.showLoadingState(false));
      const { idToken: newIdToken, refreshToken, expiresIn } = response;
      const { accessTokenTimer } = thunkAPI.getState().auth;
      console.log("Timer being cleared: ", accessTokenTimer);
      clearTimeout(accessTokenTimer);
      thunkAPI.dispatch(
        startRefreshTokenCycle({
          immediately: false,
        })
      );
      const user = {
        ...thunkAPI.getState().auth.user,
        idToken: newIdToken,
        refreshToken,
        expiresIn,
      };
      localStorage.setItem("user", JSON.stringify(user));
      onSuccess();
      return user;
    } catch (error) {
      console.log(
        "Change password failed. User: ",
        thunkAPI.getState().auth.user
      );
      console.log(error);
      thunkAPI.dispatch(uiActions.showLoadingState(false));
      return thunkAPI.rejectWithValue(error?.message || error.toString());
    }
  }
);

// Refresh access token
export const startRefreshTokenCycle = createAsyncThunk(
  "auth/startRefreshTokenCycle",
  async ({ immediately }, thunkAPI) => {
    const _convertExpiresInToInterval = (expiresIn) => expiresIn * 1000 * 0.6;
    const _refreshAccessToken = async () => {
      try {
        const user = thunkAPI.getState().auth.user;
        const refreshToken = thunkAPI.getState().auth.user.refreshToken;
        console.log("Refreshing access token");
        console.log("THE CURRENT USER IN STATE: ", user);
        const response = await authServerApi.refreshAccessToken(refreshToken);
        console.log("RESPONSE from refreshAccessToken: ", response);
        const { expires_in, id_token } = response;
        const interval = _convertExpiresInToInterval(expires_in);
        console.log("Setting off the next timer now: ", interval);
        const timerId = setTimeout(() => _refreshAccessToken(), interval);
        thunkAPI.dispatch(
          setAccessToken({ expiresIn: expires_in, idToken: id_token, timerId })
        );
      } catch (error) {
        console.log(
          "EITHER REFRESH TOKEN HAS EXPIRED OR THERE WAS AN ERROR TRYING TO REFRESH THE ACCESS TOKEN!"
        );
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

    console.log("Starting refresh cycle...");
    console.log(thunkAPI.getState().auth);
    console.log(thunkAPI.getState().auth.user);
    console.log("hello");

    // Use a refresh interval that is a percentage shorter than the actual interval to ensure the token is obtained in time
    const currentExpiresIn = thunkAPI.getState().auth.user.expiresIn;
    console.log(currentExpiresIn);
    console.log(_convertExpiresInToInterval(currentExpiresIn));

    const timerId = setTimeout(
      () => _refreshAccessToken(),
      immediately ? 0 : _convertExpiresInToInterval(currentExpiresIn)
    );
    thunkAPI.dispatch(setAccessTokenTimer(timerId));
  }
);
