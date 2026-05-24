import type { IGameCardEntity } from '@/entities/game';
import type { RootState } from '@app/store';
import { createSelector } from '@reduxjs/toolkit';
import type { Selector } from 'react-redux';

const selectSelectedCardsState = (state: RootState): { cards: IGameCardEntity[] } => state.selectedCards;

export const selectSelectedCards = createSelector(
  [selectSelectedCardsState],
  (selectedCards): IGameCardEntity[] => selectedCards.cards
);

export const selectIsCardSelectedById = (cardId: number): Selector<RootState, boolean> =>
  createSelector([selectSelectedCards], (cards): boolean => cards.some((card) => card.id === cardId));

export const selectSelectedCardsCount = createSelector(
  [selectSelectedCards],
  (selectedCards): number => selectedCards.length
);
