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

export interface ForgotPasswordForm {
  email: string;
  code?: string;
  newPassword?: string;
  newPasswordConfirm?: string;
}

export interface VerifyEmailRes extends IRes {
  result?: {
    isEmailExists: boolean;
  };
}

export const authServices = createApi({
  reducerPath: 'authServices',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://hotel-booking-app-znrf.onrender.com/api/v1',
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation<SignInRes, SignInForm>({
      query: (credentials) => ({
        url: '/user/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signUp: builder.mutation<SignUpRes, SignUpForm>({
      query: (dataForm) => ({
        url: '/user/signup',
        method: 'POST',
        body: dataForm,
      }),
    }),
    forgotPassword: builder.mutation<IRes, ForgotPasswordForm>({
      query: (dataForm) => ({
        url: '/user/forgot',
        method: 'POST',
        body: dataForm,
      }),
    }),
    generateCode: builder.mutation<IRes, ForgotPasswordForm>({
      query: (dataForm) => ({
        url: '/verify/generateEmailCode',
        method: 'POST',
        body: dataForm,
      }),
    }),
    verifyEmail: builder.mutation<VerifyEmailRes, { email: string }>({
      query: (dataForm) => ({
        url: '/verify/email',
        method: 'POST',
        body: dataForm,
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useForgotPasswordMutation,
  useGenerateCodeMutation,
  useVerifyEmailMutation,
} = authServices;
