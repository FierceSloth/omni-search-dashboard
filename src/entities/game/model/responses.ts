import type { IGameCardDTO } from '@/entities/game/model/types';

export interface IGamesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IGameCardDTO[];
}
