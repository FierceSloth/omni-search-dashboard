import { MainPage } from '@/pages/main';
import { type ReactNode } from 'react';

export function App(): ReactNode {
  return (
    <>
      <div className="ambient-light" data-testid="background" />

      <div className="container">
        <MainPage />
      </div>
    </>
  );
}
