import { App } from '@/app';
import { ErrorBoundary } from '@/shared/ui/error-boundary';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@app/styles/style.scss';

const rootElement = document.querySelector('#root');

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
} else {
  console.error('Failed to find the root element in index.html');
}
