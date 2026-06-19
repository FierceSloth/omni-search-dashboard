import { render, screen, type RenderResult } from '@testing-library/react';
import { Outlet, RouterProvider, createMemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { ROUTE_PATHS } from '@/shared/constants/routes';
import type { ReactNode } from 'react';
import { routesConfig } from './router';

vi.mock('@/app', () => {
  return {
    App: (): ReactNode => (
      <div data-testid="app-layout">
        <Outlet />
      </div>
    ),
  };
});
vi.mock('@/pages/main', () => ({
  MainPage: (): ReactNode => <div data-testid="main-page" />,
}));
vi.mock('@/pages/about', () => ({
  AboutPage: (): ReactNode => <div data-testid="about-page" />,
}));
vi.mock('@/pages/not-found/', () => ({
  NotFoundPage: (): ReactNode => <div data-testid="not-found-page" />,
}));

const renderWithRouter = (initialRoute: string): RenderResult => {
  const testRouter = createMemoryRouter(routesConfig, {
    initialEntries: [initialRoute],
  });
  return render(<RouterProvider router={testRouter} />);
};

describe('Application Router', () => {
  it('should render MainPage at HOME route', () => {
    renderWithRouter(ROUTE_PATHS.HOME);

    expect(screen.getByTestId('app-layout')).toBeInTheDocument();
    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });

  it('should render AboutPage at ABOUT route', () => {
    renderWithRouter(ROUTE_PATHS.ABOUT);

    expect(screen.getByTestId('app-layout')).toBeInTheDocument();
    expect(screen.getByTestId('about-page')).toBeInTheDocument();
  });

  it('should render NotFoundPage for unknown routes', () => {
    renderWithRouter('/some-random-broken-link-123');

    expect(screen.getByTestId('app-layout')).toBeInTheDocument();
    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });
});
