import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/app';

import '@/styles/style.scss';

const rootElement = document.querySelector('#root');

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error('Failed to find the root element in index.html');
}
