import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IRes } from '@/types/response';
import type { IOrder } from '@/types/order';

export interface OrdersRes extends IRes {
  result: IOrder[];
}

export interface OrderRes extends IRes {
  result: IOrder;
}

export interface PostOrderRes extends IRes {
  result?: IOrder;
}

export const orderServices = createApi({
  reducerPath: 'orderServices',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://hotel-booking-app-znrf.onrender.com/api/v1/' }),
  endpoints: (builder) => ({
    getOrders: builder.query<OrdersRes, void>({
      query: () => ({
        url: `orders`,
        method: 'GET',
      }),
    }),
    getOrder: builder.query<OrderRes, string>({
      query: (id) => ({
        url: `orders/${id}`,
        method: 'GET',
      }),
    }),
    postOrder: builder.mutation<PostOrderRes, IOrder>({
      query: (dataForm) => ({
        url: 'orders',
        method: 'POST',
        body: dataForm,
      }),
    }),
    deleteOrder: builder.query<PostOrderRes, string>({
      query: (id) => ({
        url: `orders/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetOrdersQuery, useGetOrderQuery, usePostOrderMutation, useDeleteOrderQuery } = orderServices;
