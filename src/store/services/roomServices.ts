import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type ImageUrl = string;

type Info = {
  title: string;
  isProvide: boolean;
};

export interface Room {
  _id: string;
  name: string;
  description: string;
  imageUrl: ImageUrl;
  imageUrlList: ImageUrl[];
  areaInfo: string;
  bedInfo: string;
  maxPeople: number;
  price: number;
  status: number;
  layoutInfo: Info[];
  facilityInfo: Info[];
  amenityInfo: Info[];
  createdAt: string;
  updatedAt: string;
}

interface RoomRes {
  status: string;
  result: Room[];
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
