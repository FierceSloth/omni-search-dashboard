import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { store } from '@app/store';
import { Provider } from 'react-redux';

import { router } from '@app/providers/router';
import { RouterProvider } from 'react-router-dom';

import '@app/styles/style.scss';
import { ThemeProvider } from '@shared/lib/context/theme';

const rootElement = document.querySelector('#root');

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      <Provider store={store}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </StrictMode>
  );
} else {
  console.error('Failed to find the root element in index.html');
}
