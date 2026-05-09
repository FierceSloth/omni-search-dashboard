import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { App } from './app';

vi.mock('@/pages/main', () => ({
  MainPage: (): ReactNode => <div data-testid="mock-main-page" />,
}));

describe('App Component', () => {
  it('should render App layout and MainPage', () => {
    render(<App />);

    const mainPageMock = screen.getByTestId('mock-main-page');
    expect(mainPageMock).toBeInTheDocument();
  });
});
