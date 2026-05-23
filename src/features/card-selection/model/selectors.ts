import type { IGameCardEntity } from '@/entities/game';
import type { RootState } from '@app/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectSelectedCardIds = createSelector(
  [(state: RootState): IGameCardEntity[] => state.selectedCards.cards],
  (cards: IGameCardEntity[]): Set<number> => new Set(cards.map((card) => card.id))
);
