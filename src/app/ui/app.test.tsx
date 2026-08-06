import { MainPage } from '@/pages/main';
import { render, screen, type RenderResult } from '@testing-library/react';
import type { ReactNode } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { App } from './app';

vi.mock('@/pages/main', () => ({
  MainPage: (): ReactNode => <div data-testid="mock-main-page" />,
}));

vi.mock('@/features/theme-switcher', () => ({
  ThemeSwitcher: (): ReactNode => <div data-testid="mock-theme-button" />,
}));

vi.mock('@/features/refresh-data', () => ({
  RefreshButton: (): ReactNode => <div data-testid="mock-refresh-button" />,
}));

describe('App Component', () => {
  const renderAppWithRouter = (): RenderResult => {
    return render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<MainPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
  };

  it('should render App layout and MainPage', () => {
    renderAppWithRouter();

    const mainPageMock = screen.getByTestId('mock-main-page');
    expect(mainPageMock).toBeInTheDocument();
  });

  it('should render background element', () => {
    renderAppWithRouter();

    const background = screen.getByTestId('background');
    expect(background).toBeInTheDocument();
  });

  it('should render theme button element', () => {
    renderAppWithRouter();

    const button = screen.getByTestId('mock-theme-button');
    expect(button).toBeInTheDocument();
  });

  it('should render refresh button element', () => {
    renderAppWithRouter();

    const button = screen.getByTestId('mock-refresh-button');
    expect(button).toBeInTheDocument();
  });
});
