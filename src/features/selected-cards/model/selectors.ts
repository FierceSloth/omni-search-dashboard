import type { RootState } from '@/app/store';

export const selectIsCardSelected = (state: RootState, cardId: number): boolean => {
  return state.selectedCards.cards.some((element) => element.id === cardId);
};
