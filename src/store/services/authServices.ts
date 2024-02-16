import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IUser } from '@/types/user';
import type { IRes } from '@/types/response';

export interface SignInForm {
  email: string;
  password: string;
  isRemember?: boolean;
}

export interface SignInRes extends IRes {
  token?: string;
  result?: IUser;
}

export interface SignUpForm extends IUser {
  passwordConfirm?: string;
  isAgree?: boolean;
}

export interface SignUpRes extends IRes {
  token?: string;
  result?: IUser;
}

export const authServices = createApi({
  reducerPath: 'authServices',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://hotel-booking-app-znrf.onrender.com/api/v1/user',
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation<SignInRes, SignInForm>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signUp: builder.mutation<SignUpRes, SignUpForm>({
      query: (dataForm) => ({
        url: '/signup',
        method: 'POST',
        body: dataForm,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authServices;
