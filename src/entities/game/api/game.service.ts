import type { IGamesResponse } from '@/entities/game/model/responses';
import type { IGameCardDTO } from '@/entities/game/model/types';
import { RawgClient } from '@/shared/api/rawg-client';

export interface ISearchGamesResponse {
  games: IGameCardDTO[];
  totalPages: number;
}

export class GameService {
  private static readonly PAGE_SIZE = 20;

  public static async searchGames(query: string, page: number = 1): Promise<ISearchGamesResponse> {
    const searchParameter = query ? `&search=${encodeURIComponent(query)}` : '';
    const endpoint = `/games?page=${page}&page_size=${this.PAGE_SIZE}${searchParameter}`;

    const data = await RawgClient.fetchData<IGamesResponse>(endpoint);
    const totalPages = Math.ceil(data.count / this.PAGE_SIZE);

    return {
      games: data.results,
      totalPages: totalPages,
    };
  }
}
