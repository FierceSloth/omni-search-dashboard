import { MainPage } from '@/pages/main';
import { render, screen, type RenderResult } from '@testing-library/react';
import type { ReactNode } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { App } from './app';

vi.mock('@/pages/main', () => ({
  MainPage: (): ReactNode => <div data-testid="mock-main-page" />,
}));

vi.mock('@/shared/ui/theme-button/theme-button', () => ({
  ThemeButton: (): ReactNode => <div data-testid="mock-theme-button" />,
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
});
