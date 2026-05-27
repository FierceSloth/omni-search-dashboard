import { gameApi } from '@/entities/game';
import { configureStore } from '@reduxjs/toolkit';
import { selectedCardsReducer } from './card-selection/slice';

export const store = configureStore({
  reducer: {
    selectedCards: selectedCardsReducer,
    [gameApi.reducerPath]: gameApi.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(gameApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
