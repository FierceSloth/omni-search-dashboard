import { ThemeButton } from '@/shared/ui/theme-button/theme-button';
import { type ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

export function App(): ReactNode {
  return (
    <>
      <div className="ambient-light" data-testid="background" />
      <ThemeButton className="theme-button" />

      <div className="container">
        <Outlet />
      </div>
    </>
  );
}
