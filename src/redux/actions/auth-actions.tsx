import { createAsyncThunk } from '@reduxjs/toolkit';
import authServerApi from '../../apis/authServerApi';
import { uiActions } from '../slices/ui-slice';
import { ALERT_TYPE } from '../../components/Feedback/Alert/Alert';
// eslint-disable-next-line import/no-cycle
import {
  setAccessTokenTimer,
  setAccessToken,
  resetUserState,
} from '../slices/auth-slice';
import type { RootState } from '../store';
import { __String } from 'typescript';

interface NewUser {
  username: string;
  password: string;
}

interface User {
  user: {
    displayName?: string;
    email: string;
    expiresIn: string;
    idToken: string;
    kind?: string;
    localId: string;
    refreshToken: string;
    registered?: boolean;
  };
  isLoading: boolean;
  error: {
    message: string;
  };
  accessTokenTimer: number;
  accessTokenReady: boolean;
}

// Register User
export const register = createAsyncThunk<User, NewUser>(
  'auth/register',
  async (user, thunkAPI) => {
    thunkAPI.dispatch(uiActions.showLoadingState(true));
    try {
      const response = await authServerApi.register({
        email: user.username,
        password: user.password,
      });
      localStorage.setItem('user', JSON.stringify(response));
      thunkAPI.dispatch(uiActions.showLoadingState(false));
      thunkAPI.dispatch(
        uiActions.addAlert({
          type: ALERT_TYPE.SUCCESS,
          title: 'Registration complete',
          message: 'Happy shopping!',
        })
      );
      return response;
    } catch (error: any) {
      thunkAPI.dispatch(uiActions.showLoadingState(false));
      return thunkAPI.rejectWithValue(error?.message || error.toString());
    }
  }
);

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async (
    { user, onSuccess }: { user: NewUser; onSuccess: () => void },
    thunkAPI
  ) => {
    thunkAPI.dispatch(uiActions.showLoadingState(true));
    try {
      const response = await authServerApi.login({
        email: user.username,
        password: user.password,
      });
      localStorage.setItem('user', JSON.stringify(response));
      thunkAPI.dispatch(uiActions.showLoadingState(false));
      thunkAPI.dispatch(
        uiActions.addAlert({
          type: ALERT_TYPE.SUCCESS,
          title: `Signed in as ${response.email}`,
          message: 'Happy shopping!',
        })
      );
      if (onSuccess) onSuccess();
      return response;
    } catch (error: any) {
      thunkAPI.dispatch(uiActions.showLoadingState(false));
      return thunkAPI.rejectWithValue(error?.message || error.toString());
    }
  }
);

// Logout user
export const logout = createAsyncThunk<
  {},
  { onSuccess: () => void; onError: () => void },
  { state: RootState }
>(
  'auth/logout',
  async ({ onSuccess = () => {}, onError = () => {} }, thunkAPI) => {
    thunkAPI.dispatch(uiActions.showLoadingState(true));
    try {
      // If there was any async logic to await, it would go here
      localStorage.removeItem('user');
      thunkAPI.dispatch(
        uiActions.addAlert({
          type: ALERT_TYPE.SUCCESS,
          title: 'You have signed out',
          message: 'See you next time!',
        })
      );
      const { accessTokenTimer } = thunkAPI.getState().auth;
      clearTimeout(accessTokenTimer || undefined);
      thunkAPI.dispatch(uiActions.showLoadingState(false));
      onSuccess();
      return thunkAPI.fulfillWithValue(null);
    } catch (error: any) {
      thunkAPI.dispatch(uiActions.showLoadingState(false));
      onError();
      return thunkAPI.rejectWithValue(error?.message || error.toString());
    }
  }
);

// Refresh access token
export const startRefreshTokenCycle = createAsyncThunk<
  {},
  { immediately: boolean },
  { state: RootState }
>('auth/startRefreshTokenCycle', async ({ immediately }, thunkAPI) => {
  // Use a refresh interval that is a percentage shorter than the actual interval to ensure the token is obtained in time
  const _convertExpiresInToInterval = (expiresIn: number) =>
    expiresIn * 1000 * 0.6;
  const _refreshAccessToken = async () => {
    try {
      const { refreshToken } = thunkAPI.getState().auth.user;
      const response = await authServerApi.refreshAccessToken(refreshToken);
      const { expires_in: expiresIn, id_token: idToken } = response;
      const interval = _convertExpiresInToInterval(expiresIn);
      const timerId = setTimeout(() => _refreshAccessToken(), interval);
      thunkAPI.dispatch(setAccessToken({ expiresIn, idToken, timerId }));
    } catch (error) {
      localStorage.removeItem('user');
      thunkAPI.dispatch(resetUserState({ keepUser: true }));
      // if immediately is true, it means we have come from starting the app (e.g. refreshing the page), therefore no real need to show alert warning.  Alert warning only makes sense if user is already using app and they are logged out becuase of invalid refresh token
      if (!immediately)
        thunkAPI.dispatch(
          uiActions.addAlert({
            type: ALERT_TYPE.WARNING,
            title: 'Your session has expired',
            message: 'Please sign in again to keep shopping.',
          })
        );
    }
  };

  const currentExpiresIn = thunkAPI.getState().auth.user.expiresIn;
  const timerId = setTimeout(
    () => _refreshAccessToken(),
    immediately ? 0 : _convertExpiresInToInterval(currentExpiresIn)
  );
  thunkAPI.dispatch(setAccessTokenTimer(timerId));
});

// Change password
export const changePassword = createAsyncThunk<
  {},
  { newPassword: string; onSuccess: () => void },
  { state: RootState }
>(
  'auth/changePassword',
  async ({ newPassword, onSuccess = () => {} }, thunkAPI) => {
    thunkAPI.dispatch(uiActions.showLoadingState(true));
    const { idToken } = thunkAPI.getState().auth.user;
    try {
      const response = await authServerApi.changePassword({
        idToken,
        password: newPassword,
      });
      thunkAPI.dispatch(
        uiActions.addAlert({
          type: ALERT_TYPE.SUCCESS,
          title: 'Password Updated',
          message: 'Your password has been updated.',
        })
      );
      thunkAPI.dispatch(uiActions.showLoadingState(false));
      const { idToken: newIdToken, refreshToken, expiresIn } = response;
      const { accessTokenTimer } = thunkAPI.getState().auth;
      clearTimeout(accessTokenTimer || undefined);
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
      localStorage.setItem('user', JSON.stringify(user));
      onSuccess();
      return user;
    } catch (error: any) {
      thunkAPI.dispatch(uiActions.showLoadingState(false));
      return thunkAPI.rejectWithValue(error?.message || error.toString());
    }
  }
);
