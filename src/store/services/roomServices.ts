import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IRoom } from '@/types/room';
import type { IRes } from '@/types/response';

interface RoomsRes extends IRes {
  result: IRoom[];
}

interface RoomRes extends IRes {
  result: IRoom;
}

export const roomServices = createApi({
  reducerPath: 'roomServices',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://hotel-booking-app-znrf.onrender.com/api/v1/' }),
  endpoints: (builder) => ({
    getRooms: builder.query<RoomsRes, void>({
      query: () => ({
        url: `rooms`,
        method: 'GET',
      }),
    }),
    getRoom: builder.query<RoomRes, string>({
      query: (id) => ({
        url: `rooms/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetRoomsQuery, useGetRoomQuery } = roomServices;
