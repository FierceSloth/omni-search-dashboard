import { configureStore, type Store } from '@reduxjs/toolkit';
import { render, type RenderOptions, type RenderResult } from '@testing-library/react';
import { type ReactElement, type ReactNode } from 'react';
import { Provider } from 'react-redux';

import { selectedCardsReducer } from '@/app/store';

export const setupStore = (): Store => {
  return configureStore({
    reducer: {
      selectedCards: selectedCardsReducer,
    },
  });
};

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  route?: string;
  store?: ReturnType<typeof setupStore>;
}

type returnType = { store: ReturnType<typeof setupStore> } & RenderResult;

import { NextIntlClientProvider } from 'next-intl';
import messages from '../../../../messages/en.json';

export function renderWithProviders(
  ui: ReactElement,
  { store = setupStore(), ...renderOptions }: ExtendedRenderOptions = {}
): returnType {
  function Wrapper({ children }: { children: ReactNode }): ReactElement {
    return (
      <Provider store={store}>
        <NextIntlClientProvider messages={messages} locale="en">
          {children}
        </NextIntlClientProvider>
      </Provider>
    );
  }
  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  } as returnType;
}
