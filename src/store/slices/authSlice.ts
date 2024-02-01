import { RootState } from '../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserInfo = {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  address: {
    zipcode: number | null;
    detail: string;
    county: string;
    city: string;
  };
};

type Auth = {
  userInfo: UserInfo;
  userToken: string | null;
};

const userToken = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null;

const initialState: Auth = {
  userInfo: {
    _id: '',
    name: '',
    email: '',
    password: '',
    phone: '',
    birthday: '',
    address: {
      zipcode: null,
      detail: '',
      county: '',
      city: '',
    },
  },
  userToken,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserToken: (state, action: PayloadAction<string>) => {
      state.userToken = action.payload;
    },
    clearUserToken: (state) => {
      state.userToken = null;
    },
  },
});

export const { setUserToken, clearUserToken } = authSlice.actions;

export const authReducer = (state: RootState) => state.authReducer;

export default authSlice.reducer;
