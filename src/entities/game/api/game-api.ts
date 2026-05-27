import type { IGamesResponse } from '@/entities/game/model/responses';
import type { IGameDetailsDTO } from '@/entities/game/model/types';
import { type IGameCardDTO } from '@/entities/game/model/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface ISearchGamesResponse {
  games: IGameCardDTO[];
  totalPages: number;
}

const CACHE_TTL = Number(import.meta.env.VITE_CACHE_TTL) || 60;
const API_KEY = import.meta.env.VITE_RAWG_API_KEY as string;
const PAGE_SIZE = 20;

export const gameApi = createApi({
  reducerPath: 'gameApi',

  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.rawg.io/api' }),

  tagTypes: ['Games', 'GameDetails'],
  keepUnusedDataFor: CACHE_TTL,

  endpoints: (builder) => ({
    getGames: builder.query<ISearchGamesResponse, { query: string; page?: number }>({
      query: ({ query, page = 1 }) => ({
        url: '/games',
        params: {
          key: API_KEY,
          page,
          page_size: PAGE_SIZE,
          search: query || undefined,
        },
      }),

      transformResponse: (response: IGamesResponse): ISearchGamesResponse => ({
        games: response.results,
        totalPages: Math.ceil(response.count / PAGE_SIZE),
      }),

      providesTags: ['Games'],
    }),

    getGameById: builder.query<IGameDetailsDTO, number>({
      query: (id) => ({
        url: `/games/${id}`,
        params: {
          key: API_KEY,
        },
      }),

      providesTags: (_result, _error, id) => [{ type: 'GameDetails', id }],
    }),
  }),
});

export const { useGetGamesQuery, useGetGameByIdQuery } = gameApi;
