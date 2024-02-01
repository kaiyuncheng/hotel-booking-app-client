import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface News {
  _id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface Culinary extends News {
  diningTime: string;
}

export const homeServices = createApi({
  reducerPath: 'homeServices',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://hotel-booking-app-znrf.onrender.com/api/v1/home/' }),
  endpoints: (builder) => ({
    getNews: builder.query<News[], string | 'all'>({
      query: (id) => {
        if (id !== 'all') {
          return `news/${id}`;
        }
        return 'news';
      },
    }),
    getCulinary: builder.query<Culinary[], string | 'all'>({
      query: (id) => {
        if (id !== 'all') {
          return `culinary/${id}`;
        }
        return 'culinary';
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetNewsQuery, useGetCulinaryQuery } = homeServices;
