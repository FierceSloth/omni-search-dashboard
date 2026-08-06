import type { IGameCardEntity } from '@/entities/game';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ISelectedCardStore {
  cards: IGameCardEntity[];
}

const initialState: ISelectedCardStore = {
  cards: [],
};

const selectedCardsSlice = createSlice({
  name: 'selectedCards',
  initialState,
  reducers: {
    toggleSelected: (state, action: PayloadAction<IGameCardEntity>): void => {
      const card = action.payload;

      const isAlreadySelected = state.cards.some((element) => element.id === card.id);

      if (isAlreadySelected) {
        state.cards = state.cards.filter((element) => element.id !== card.id);
      } else {
        state.cards.push(card);
      }
    },

    clearAllSelected: (state): void => {
      state.cards = [];
    },
  },
});

export const { toggleSelected, clearAllSelected } = selectedCardsSlice.actions;
export const selectedCardsReducer = selectedCardsSlice.reducer;
