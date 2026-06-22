import { configureStore } from '@reduxjs/toolkit';
import { selectedCardsReducer } from './card-selection/slice';

export const store = configureStore({
  reducer: {
    selectedCards: selectedCardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
