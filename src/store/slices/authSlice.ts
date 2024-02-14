import { RootState } from '../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IUser } from '@/types/user';

type Auth = {
  userToken?: string | null;
  userInfo?: IUser | null;
};

const userToken = localStorage.getItem('userToken') ?? null;

const initialState: Auth = {
  userToken,
  userInfo: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload: { userToken, userInfo } }: PayloadAction<Auth>) => {
      if (userToken) state.userToken = userToken;
      if (userInfo) state.userInfo = userInfo;
    },
    clearCredentials: (state) => {
      state.userInfo = null;
      state.userToken = null;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export const selectToken = (state: RootState) => state.authReducer.userToken;

export const selectUser = (state: RootState) => state.authReducer.userInfo;

export default authSlice.reducer;
