import { gameMapper } from '@/entities/game/lib/game-mapper';
import type { IGamesResponse } from '@/entities/game/model/responses';
import type { IGameCardEntity } from '@/entities/game/model/types';
import { RawgClient } from '@/shared/api/rawg-client';

export class GameService {
  public static async searchGames(query: string): Promise<IGameCardEntity[]> {
    const endpoint = query.trim() ? `/games?search=${encodeURIComponent(query)}` : `/games`;

    const data = await RawgClient.fetchData<IGamesResponse>(endpoint);
    return data.results?.map((card) => gameMapper.mapGameCard(card));
  }
}
