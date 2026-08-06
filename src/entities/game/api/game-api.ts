import { GAME_API_TAGS } from '@/entities/game/api/api-tags';
import { gameMapper } from '@/entities/game/lib/game-mapper';
import type { IGamesResponse } from '@/entities/game/model/responses';
import type { IGameCardEntity, IGameDetailsDTO, IGameDetailsEntity } from '@/entities/game/model/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface ISearchGamesResponse {
  games: IGameCardEntity[];
  totalPages: number;
}

const CACHE_TTL = Number(import.meta.env.VITE_CACHE_TTL) || 60;
const API_KEY = import.meta.env.VITE_RAWG_API_KEY as string;
const DEFAULT_PAGE_SIZE = 20;

export const gameApi = createApi({
  reducerPath: 'gameApi',

  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.rawg.io/api' }),

  tagTypes: Object.values(GAME_API_TAGS),
  keepUnusedDataFor: CACHE_TTL,

  endpoints: (builder) => ({
    getGames: builder.query<ISearchGamesResponse, { query: string; page?: number; pageSize?: number }>({
      query: ({ query, page = 1, pageSize = DEFAULT_PAGE_SIZE }) => ({
        url: '/games',
        params: {
          key: API_KEY,
          page,
          page_size: pageSize,
          search: query || undefined,
        },
      }),

      transformResponse: (response: IGamesResponse, _meta, argument): ISearchGamesResponse => {
        const currentPageSize = argument.pageSize || DEFAULT_PAGE_SIZE;

        return {
          games: response.results.map((game) => gameMapper.mapGameCard(game)),
          totalPages: Math.ceil(response.count / currentPageSize),
        };
      },

      providesTags: [GAME_API_TAGS.GAMES],
    }),

    getGameById: builder.query<IGameDetailsEntity, number>({
      query: (id) => ({
        url: `/games/${id}`,
        params: {
          key: API_KEY,
        },
      }),

      transformResponse: (response: IGameDetailsDTO): IGameDetailsEntity => {
        return gameMapper.mapGameDetails(response);
      },

      providesTags: (_result, _error, id) => [{ type: GAME_API_TAGS.GAME_DETAILS, id }],
    }),
  }),
});

export const { useGetGamesQuery, useGetGameByIdQuery } = gameApi;
