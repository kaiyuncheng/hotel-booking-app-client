import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { INews, ICulinary } from '@/types/home';

interface NewsRes {
  status: string;
  result: INews[];
}

interface CulinaryRes {
  status: string;
  result: ICulinary[];
}

export const homeServices = createApi({
  reducerPath: 'homeServices',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://hotel-booking-app-znrf.onrender.com/api/v1/home/' }),
  endpoints: (builder) => ({
    getNews: builder.query<NewsRes, string | 'all'>({
      query: (id) => {
        if (id !== 'all') {
          return `news/${id}`;
        }
        return 'news';
      },
    }),
    getCulinary: builder.query<CulinaryRes, string | 'all'>({
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
