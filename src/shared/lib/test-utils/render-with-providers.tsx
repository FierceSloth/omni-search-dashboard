import { configureStore, type Store } from '@reduxjs/toolkit';
import { render, type RenderOptions, type RenderResult } from '@testing-library/react';
import { type ReactElement, type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { selectedCardsReducer } from '@/app/store';
import { gameApi } from '@/entities/game';

export const setupStore = (): Store => {
  return configureStore({
    reducer: {
      selectedCards: selectedCardsReducer,
      [gameApi.reducerPath]: gameApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }).concat(gameApi.middleware),
  });
};

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  route?: string;
  store?: ReturnType<typeof setupStore>;
}

type returnType = { store: ReturnType<typeof setupStore> } & RenderResult;

export function renderWithProviders(
  ui: ReactElement,
  { route = '/', store = setupStore(), ...renderOptions }: ExtendedRenderOptions = {}
): returnType {
  function Wrapper({ children }: { children: ReactNode }): ReactElement {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </Provider>
    );
  }
  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  } as returnType;
}
