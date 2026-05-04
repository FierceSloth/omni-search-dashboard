import type { IGamesResponse } from '@/entities/game/model/responses';
import type { IGameCardDTO } from '@/entities/game/model/types';
import { RawgClient } from '@/shared/api/rawg-client';

export class GameService {
  public static async searchGames(query: string): Promise<IGameCardDTO[]> {
    const endpoint = query ? `/games?search=${encodeURIComponent(query)}` : `/games`;

    const data = await RawgClient.fetchData<IGamesResponse>(endpoint);
    return data.results;
  }
}
