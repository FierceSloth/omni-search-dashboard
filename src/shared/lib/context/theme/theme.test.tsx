import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from './theme.provider';
import { useTheme } from './use-theme';

const TestConsumer = (): ReactNode => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
};

describe('Theme Context', () => {
  beforeEach(() => {
    document.documentElement.dataset.theme = '';
  });

  it('should set default light theme and apply it to documentElement', () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    const themeSpan = screen.getByTestId('theme-value');

    expect(themeSpan).toHaveTextContent('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');
  });

  it('should toggle theme and update documentElement dataset', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    const toggleButton = screen.getByRole('button');
    await user.click(toggleButton);

    const themeSpan = screen.getByTestId('theme-value');

    expect(themeSpan).toHaveTextContent('light');
    expect(document.documentElement.dataset.theme).toBe('light');

    await user.click(toggleButton);

    expect(themeSpan).toHaveTextContent('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');
  });

  it('should throw error when useTheme is used outside ThemeProvider', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<TestConsumer />)).toThrow('useTheme must be used strictly within ThemeProvider');

    consoleSpy.mockRestore();
  });
});
