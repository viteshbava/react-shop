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
import User from '../../models/user';

interface MyKnownError {
  message: string;
}
interface NewUser {
  username: string;
  password: string;
}

// Register User
export const register = createAsyncThunk<
  User,
  NewUser,
  { rejectValue: MyKnownError }
>('auth/register', async (user, thunkAPI) => {
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
    return response as User;
  } catch (error: any) {
    thunkAPI.dispatch(uiActions.showLoadingState(false));
    return thunkAPI.rejectWithValue(
      error?.message || (error.toString() as MyKnownError)
    );
  }
});

// Login user
export const login = createAsyncThunk<
  User,
  { user: NewUser; onSuccess: () => void },
  { rejectValue: MyKnownError }
>('auth/login', async ({ user, onSuccess }, thunkAPI) => {
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
    return response as User;
  } catch (error: any) {
    thunkAPI.dispatch(uiActions.showLoadingState(false));
    return thunkAPI.rejectWithValue(
      error?.message || (error.toString() as MyKnownError)
    );
  }
});

// Logout user
export const logout = createAsyncThunk<
  {},
  { onSuccess: () => void; onError: () => void },
  { state: RootState; rejectValue: MyKnownError }
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
  const _convertExpiresInToInterval = (expiresIn: number | string) => {
    let value: number;
    if (typeof expiresIn === 'number') {
      value = expiresIn;
    } else {
      if (isNaN(parseFloat(expiresIn)))
        throw new Error('expiresIn is not a valid number string!');
      value = parseFloat(expiresIn);
    }
    return value * 1000 * 0.6;
  };
  const _refreshAccessToken = async () => {
    try {
      const user = thunkAPI.getState().auth.user;
      if (!user) throw new Error('No user to refresh!');
      const response = await authServerApi.refreshAccessToken(
        user.refreshToken
      );
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

  const user = thunkAPI.getState().auth.user;
  if (!user) throw new Error('No user to refresh!');
  const timerId = setTimeout(
    () => _refreshAccessToken(),
    immediately ? 0 : _convertExpiresInToInterval(user.expiresIn)
  );
  thunkAPI.dispatch(setAccessTokenTimer(timerId));
});

// Change password
export const changePassword = createAsyncThunk<
  User,
  { newPassword: string; onSuccess: () => void },
  { state: RootState; rejectValue: MyKnownError }
>(
  'auth/changePassword',
  async ({ newPassword, onSuccess = () => {} }, thunkAPI) => {
    thunkAPI.dispatch(uiActions.showLoadingState(true));
    try {
      const user = thunkAPI.getState().auth.user;
      if (!user) throw new Error('No user for changePassword!');
      const response = await authServerApi.changePassword({
        idToken: user.idToken,
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
      const updatedUser = {
        ...user,
        idToken: newIdToken,
        refreshToken,
        expiresIn,
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      onSuccess();
      return updatedUser as User;
    } catch (error: any) {
      thunkAPI.dispatch(uiActions.showLoadingState(false));
      return thunkAPI.rejectWithValue(
        error?.message || (error.toString() as MyKnownError)
      );
    }
  }
);
