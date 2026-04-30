import type { IGameCardDTO, IGameCardEntity } from '@/features/search-panel/common/types/types';
import { searchMapper } from '@/features/search-panel/common/utils/search-mapper';

interface IGamesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IGameCardDTO[];
}

export class RawgApiService {
  private static readonly API_KEY = 'ee4cd6c77f4848da9975f75afa6d2a1d';
  private static readonly BASE_URL = 'https://api.rawg.io/api';

  public static async searchGames(query: string): Promise<IGameCardEntity[]> {
    const url = `${RawgApiService.BASE_URL}/games?key=${RawgApiService.API_KEY}&search=${query}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('HTTP error! status: ${response.status}');
    }

    const data = (await response.json()) as IGamesResponse;

    return data?.results.map((dto) => searchMapper.mapGameCard(dto));
  }
}
