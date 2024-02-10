import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IRoom } from '@/types/room';

interface RoomRes {
  status: string;
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

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetRoomQuery } = roomServices;
