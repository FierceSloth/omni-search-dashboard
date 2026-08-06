import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { router } from '@/app/providers/router';
import { RouterProvider } from 'react-router-dom';

import '@app/styles/style.scss';

const rootElement = document.querySelector('#root');

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
} else {
  console.error('Failed to find the root element in index.html');
}
