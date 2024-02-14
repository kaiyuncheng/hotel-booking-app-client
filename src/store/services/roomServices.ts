import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IRoom } from '@/types/room';
import type { IRes } from '@/types/response';

interface RoomRes extends IRes {
  result: IRoom[];
}

export const roomServices = createApi({
  reducerPath: 'roomServices',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://hotel-booking-app-znrf.onrender.com/api/v1/' }),
  endpoints: (builder) => ({
    getRoom: builder.query<RoomRes, string | 'all'>({
      query: (id) => {
        if (id !== 'all') {
          return `rooms/${id}`;
        }
        return 'rooms';
      },
    }),
  }),
});

export const { useGetRoomQuery } = roomServices;
