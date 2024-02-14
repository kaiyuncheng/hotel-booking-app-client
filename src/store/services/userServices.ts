import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { IUser } from '@/types/user';
import type { IRes } from '@/types/response';

interface GetUserRes extends IRes {
  token?: string;
  result?: IUser;
}

interface CheckUserRes extends IRes {
  token?: string;
}

// interface UpdateUserRes extends IRes {
//   status: boolean;
//   message: string;
// }

export const userServices = createApi({
  reducerPath: 'userServices',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://hotel-booking-app-znrf.onrender.com/api/v1/user',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authReducer.userToken;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUser: builder.query<GetUserRes, void>({
      query: () => ({
        url: '/',
        method: 'GET',
      }),
    }),
    checkUser: builder.query<CheckUserRes, void>({
      query: () => ({
        url: '/check',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetUserQuery, useCheckUserQuery } = userServices;
