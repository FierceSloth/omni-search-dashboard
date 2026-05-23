import { selectSelectedCards } from '@/features/card-selection';
import { createSelector } from '@reduxjs/toolkit';

export const selectSelectedCardsCount = createSelector(
  [selectSelectedCards],
  (selectedCards): number => selectedCards.length
);
