import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import {
  register,
  login,
  logout,
  changePassword,
} from '../actions/auth-actions';
import User from '../../models/user';

interface MyKnownError {
  message: string;
}
interface UserState {
  user: User | null;
  isLoading: boolean;
  error: MyKnownError | null;
  accessTokenTimer: number | null;
  accessTokenReady: boolean;
}

// Get user from localStorage
const localStorageUser = localStorage.getItem('user');

const STATE_INIT: UserState = {
  user: localStorageUser ? JSON.parse(localStorageUser) : null,
  isLoading: false,
  error: null,
  accessTokenTimer: null,
  accessTokenReady: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: STATE_INIT,

  reducers: {
    setAccessToken: (state, action) => {
      if (state.user) {
        state.user.idToken = action.payload.idToken;
        state.user.expiresIn = action.payload.expiresIn;
        state.accessTokenTimer = action.payload.timerId;
        state.accessTokenReady = true;
      }
    },
    setAccessTokenTimer: (state, action) => {
      state.accessTokenTimer = action.payload;
    },
    resetUserState: (state, action) => {
      if (!action?.payload?.keepUser) {
        state.user = null;
        state.accessTokenReady = false;
      }
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
      .addCase(register.rejected, (state, action) => ({
        ...STATE_INIT,
        user: null,
        error: action.payload
          ? action.payload
          : { message: 'Unable to register user!' },
      }))
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
      .addCase(login.rejected, (_, action) => ({
        ...STATE_INIT,
        user: null,
        error: action.payload
          ? action.payload
          : { message: 'Unable to login!' },
      }))
      // LOGOUT - PENDING
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      // LOGOUT - FULFILLED
      .addCase(logout.fulfilled, () => ({ ...STATE_INIT, user: null }))
      // LOGOUT - REJECTED
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
          ? action.payload
          : { message: 'Unable to logout!' };
      })
      // CHANGE PASSWORD - PENDING
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      // CHANGE PASSWORD - FULFILLED
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload;
      })
      // CHANGE PASSWORD - REJECTED
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
          ? action.payload
          : { message: 'Unable to change password!' };
      });
  },
});

export const { resetUserState, setAccessTokenTimer, setAccessToken } =
  authSlice.actions;
export default authSlice.reducer;
export type { UserState };
