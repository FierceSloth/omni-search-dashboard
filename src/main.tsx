import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const rootElement = document.querySelector('#root');

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(<StrictMode></StrictMode>);
} else {
  console.error('');
}
