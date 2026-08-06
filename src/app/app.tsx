import { type ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

export function App(): ReactNode {
  return (
    <>
      <div className="ambient-light" data-testid="background" />

      <div className="container">
        <Outlet />
      </div>
    </>
  );
}
