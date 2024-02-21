import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import type { IUser } from '@/types/user';
import type { IRes } from '@/types/response';

interface GetUserRes extends IRes {
  token?: string;
  result?: IUser;
}

interface CheckUserRes extends IRes {
  token?: string;
}

interface UpdateUserRes extends IRes {
  result?: IUser;
}

export interface UpdateUserForm extends IUser {
  userId?: string;
  oldPassword?: string;
  newPassword?: string;
  newPasswordConfirm?: string;
}

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
    updateUser: builder.mutation<UpdateUserRes, UpdateUserForm>({
      query: (dataForm) => ({
        url: '/',
        method: 'PUT',
        body: dataForm,
      }),
    }),
  }),
});

export const { useGetUserQuery, useCheckUserQuery, useUpdateUserMutation } = userServices;
